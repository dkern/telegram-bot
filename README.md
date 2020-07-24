# Telegram Bot

This is a small Telegram Bot Framework based on [`node.js`](https://nodejs.org) and [`node-telegram-bot-api`](https://www.npmjs.com/package/node-telegram-bot-api).
It is very easy to use and extend for own commands and replies.


## Table of Contents
* [Installation](#installation)
* [Configuration](#configuration)
* [Starting Bot](#starting-bot)
* [Add own Commands](#add-own-commands)
  * [Custom Commands Folder](#custom-commands-folder)
  * [Add single Command manually](#add-single-command-manually)
* [Use Messages Helper](#use-messages-helper)
  * [Send Message to a single Chat](#send-message-to-a-single-chat)
  * [Send Message to all registered Users](#send-message-to-all-registered-users)
  * [Use predefined Messages](#use-predefined-messages)
  * [Random Messages](#random-messages)
  * [Replaces in Messages](#replaces-in-messages)
  * [Use other Messages of the Telegram Bot API](#use-other-messages-of-the-telegram-bot-api)
* [User Whitelist](#user-whitelist)
* [Validate Scripts](#validate-scripts)
* [Bugs / Feature request](#bugs--feature-request)
* [License](#license)
* [Donation](#donation)


---


## Installation
The Bot can easily be installed with [npm](https://npmjs.com).

```SH
$ npm install telegram-chat-bot
```

If installed this way, it's only needed to require `telegram-chat-bot` in the starting script file to use it.

```JS
let TelegramBotWrapper = require('telegram-chat-bot');
```


## Configuration
The Bot requires up to two configuration objects.
The first one, for the bot configuration itself, is mandatory.
An example of this object can be found in `config/bot.js` file.
The `token` is the only required field, everything else is optional and would fallback to the defaults, if missing.

Default Bot-Config:

```JS
let config = {
    name: 'MyBot',
    token: '',
    useUserWhitelist: false,
    allowedUserWhitelist: [
        'usernames'
    ],
    options: {
        polling: true
    },
    storage: {
        directory: '/temp',
        file: 'registered.json',
    }
}
```

The second configuration is for messages of the bot instance.
If passed in, the messages would overwrite the defaults.
An example of the default messages can be found in `config/messages.js`.


## Starting Bot
Both configurations have to be passed to the constructor on initialization:
After initialization it's possible to register all commands to the bot and start polling.

The `.start()` function returns a promise what can be used for further actions.

```JS
let config = require('./config/bot');
let messages = require('./config/messages');
let TelegramBotWrapper = require('telegram-chat-bot');

let instance = new TelegramBotWrapper(config, messages);
instance.start().then(() => {
    console.log('polling started');
});
```


## Add own Commands
Creating an own command is pretty easy.
Just create a new file in the `./commands` folder with the name of the command as filename.
This files will be loaded automatically.

An command object needs to have three mandatory properties, `cmd`, `showInHelp`, `register`.
If `showInHelp` is `true` there should also be an `description` property set.
So a command file should look somehow like this:

```JS
'use strict';

/**
 * own command
 * @type {{cmd: string, description: string, showInHelp: boolean, register: function}}
 */
let Command = {
    /**
     * command as string, used for help print
     * @type {string}
     */
    cmd: '/own',

    /**
     * command description, used for help
     * @type {string}
     */
    description: 'my own command',

    /**
     * show command in help message
     * @type {boolean}
     */
    showInHelp: true,

    /**
     * command register handler
     * @param {TelegramBotWrapper} instance
     * @returns {void}
     */
    register: instance => {
        this.bot.onText(/^\/own$/i, msg => {
            if (!this.security.check(msg)) {
                return;
            }

            // ...
        });
    }
};

module.exports = Command;
```


### Custom Commands Folder
If command files are stored in different folder, they can be added to the auto-loading too.
These commands will be registered when calling `.start()` then.
Just add the custom folder after initialization.

```JS
instance.autoloader.addCommandsDir('./comments_folder');
```


### Add single Command manually
It's possible to add a single command object to an instance too.
This command will be registered when calling `.start()`.
Just add the file after initialization.

```JS
instance.autoloader.addCommand('custom', {
    cmd: '/custom',
    description: 'my custom command',
    showInHelp: true,
    register: instance => {
        // ...
    }
});
```


## Use Messages Helper
To easily reply with formatted messages to a single chat or as broadcast to all registered users, there is a helper class available.
The `messages` helper does have different tasks.


### Send Message to a single Chat
Messages can be send as relpy of a message with the following functions:

```JS
let chatId = msg.chat.id;

this.messages.sendHtml(chatId, 'my <strong>message</strong>');
this.messages.sendMarkdown(chatId, 'my **message**');
this.messages.sendText(chatId, 'my message');
this.messages.sendPhoto(chatId, 'http://domain.tld/image.jpg', 'caption');
```


### Send Message to all registered Users
Messages to all registered users can be send by broadcasts:

```JS
this.messages.sendHtmlBroadcast('my <strong>message</strong>');
this.messages.sendMarkdownBroadcast('my **message**');
this.messages.sendTextBroadcast('my message');
this.messages.sendPhotoBroadcast('http://domain.tld/image.jpg', 'caption');
```

Another way:

```JS
this.messages.broadcast.sendHtml('my <strong>message</strong>');
this.messages.broadcast.sendMarkdown('my **message**');
this.messages.broadcast.sendText('my message');
this.messages.broadcast.sendPhoto('http://domain.tld/image.jpg', 'caption');
```


### Use predefined Messages
To store all messages in a single place or whenever a message will be reused, predefined messages are a good choice.
There messages are stored in an object, what is given to the bot instance on initialization.

The property name of this message is the identifier.
All function of the helper will look onto this object in first place.
If a message with the given name is available it will automatically user it.

```JS
let messages = {
    myMessage: 'Hello there!'
};
```

```JS
this.messages.sendText(chatId, 'myMessage');
```

This will send `Hello there!` as message to this chat.
But this works for other functions, like broadcasts too.

The message formatter could even be called manually.

```JS
let msg = this.messages.formatter('myMessage');

// shorthand
let msg = this.messages._('myMessage');
```


### Random Messages
Whenever a predefined message is set to an `array`, instead of a `string`, the helper will select a custom one.
This is helpful to get a bit variable response on returning tasks.

```JS
let messages = {
    myMessage: [
        'some reply',
        'another reply'
    ]
};
```

```JS
this.messages.sendText(chatId, 'myMessage');
```

This will send `some reply` or `another reply` as response.


### Replaces in Messages
The helper can automatically replace values in messages.
It makes no difference if the message is predefined or inline.
Simply put a placeholder where you want the value to be replaced. 
These placeholders are likely to ES6 template literals.
For example, a predefined message like this:

```JS
let messages = {
    myMessage: 'Hello ${user}, my name is ${bot}!'
};
```

The values for `user` and `bot` are simply passed as object to the message helper functions:

```JS
this.messages.sendText(chatId, 'myMessage', {
    user: 'Eisbehr',
    bot: 'Jarvis'
});
```

This will send a message like this:

> Hello Eisbehr, my name is Jarvis!


### Use other Messages of the Telegram Bot API
If you need to use different message-types, there is a direct access to the [bot instance](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md).

```JS
this.bot.on('sticker', msg => {
    // ...
});
```


## User Whitelist
There is a build-in whitelist based on the username of messages senders.
If this whitelist should be used, the `useUserWhitelist` property of the initialization configuration object have to be `true`.
Afterwards allowed usernames can be added to the `allowedUserWhitelist` array.

```JS
let config = {
    useUserWhitelist: true,
    allowedUserWhitelist: [
        'some_user',
        'another_user',
        '...'
    ]
};
```

Inside of your commands, there is a `security` helper available, to check if a message is allowed by a user.
There are tree functions available:

- `allowed` - checks if the username is allowed by whitelist
- `registerd` - check is the user is registered with the bot
- `check` - combines the two above and will automatically respond with default messages

This functions will return an `boolean` and so can be used directly.

```JS
let Command = {
    register: instance => {
        this.bot.onText(/^\/own$/i, msg => {
            if (!this.security.check(msg)) {
                return;
            }

            // ...
        });
    }
}
```


## Validate Scripts
Because you will not see all errors on blind execution of your scripts, there is a build-in javascript validation with `gulp` and `jshint`.
You can execute this validation whenever you like with the following command:

```SH
$ gulp validate
```


## Bugs / Feature request
Please [report](http://github.com/dkern/telegram-bot/issues) bugs and feel free to [ask](http://github.com/dkern/telegram-bot/issues) for new features directly on GitHub.


## License
This project is dual-licensed under [MIT](http://www.opensource.org/licenses/mit-license.php) and [GPL-2.0](http://www.gnu.org/licenses/gpl-2.0.html) license.


## Donation
_You like to support me?_  
_You appreciate my work?_  
_You use it in commercial projects?_  
  
Feel free to make a little [donation](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=93XQ8EYMSWHC6)! :wink:

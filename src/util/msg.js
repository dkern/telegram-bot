'use strict';

/**
 * helper class for definition of telegram messages
 * @type {{message_id: number, from: {id: number, is_bot: boolean, first_name: string, username: string, language_code: string}, chat: {id: number, first_name: string, username: string, type: string}, date: number, text: string, entities: *[]}}
 */
let TelegramBotMessage = {
    message_id: 0,
    from: {
        id: 0,
        is_bot: false,
        first_name: '',
        username: '',
        language_code: ''
    },
    chat: {
        id: 0,
        first_name: '',
        username: '',
        type: ''
    },
    date: 0,
    text: '',
    entities: [{
        offset: 0,
        length: 0,
        type: ''
    }]
};

module.exports = TelegramBotMessage;

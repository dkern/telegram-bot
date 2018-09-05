'use strict';

module.exports = {
    // server console messages
    serverStarting: '${name} is running ...',
    serverStopping: '${name} is shutting down ...',
    serverRegisterCmd: 'Command \'${cmd}\' registered ...',

    // default messages
    started: '✅ Mein Dienst wurde gestartet. Ich stehe wieder zur Verfügung.',
    stopped: '❌ Meine Systeme werden heruntergefahren. Ich stehe momentan nicht weiter zur Verfügung.',

    // user authentication
    userAllowed: 'Ich freue mich dich registreiren zu dürfen! 👍 Ich habe die Freigabe, dir ab sofort benötigte Informationen zukommen zu lassen.',
    userUnregistered: 'Du musst dich anmelden, um mit mir zu sprechen. Nutze den /start Befehl dazu!',
    userRejected: [
        '❌ Ich habe leider keine Freigabe, um mit dir zu sprechen. Bitte wende dich an meinen Entwickler. Du weißt schon.',
        '❌ Permission denied.',
        '❌ Für dich ist leider keine Sicherheitsfreigabe vorhanden. Ich darf nicht mit dir sprechen.',
        '❌ Ich kenne dich nicht, daher antworte ich dir auch nicht.',
        '❌ Meine Firewall blockiert dich weiterhin.',
        '❌ Wenn du Informationen von mir haben möchtest, sprich zuerst mit meinem Besitzer.'
    ],

    // command responses
    start: 'Hallo ${user}! 👋 Ich bin *${name}*, Eisbehr\'s persönlicher Homebot. Ich habe Kontrolle über alle Haus-Systeme und verteile wenn nötig Informationen. 🏡',
    help: '*Du brauchst Hilfe?*\n\nMit folgenden Kommandos kannst du mir Befehle erteilen oder Informationen anfragen:',
    unregistered: 'Bestätigt. Du erhälst keine weiteren Updates von mir. 🙅🏼‍♂️',
    uptime: 'Meine Dienste wurden am *${date}* um *${time}* Uhr initialisiert. Somit bin ich seit *${uptime}* aktiv. ⏱',
    whoamiRegistered: 'Du bist *${name}* und ich habe dich seit dem *${date}* um *${time}* Uhr registriert. 🔍',
    whoamiUnregistered: 'Du bist *${name}*, ich kann allerdings keine Daten zu dir finden. 🤔 Ich glaube du bist nicht registriert. Nutze /start, um dich anzumelden.',

    // command help
    cmdHelp: 'prints this help',
    cmdStart: 'start interactions',
    cmdSayHello: 'welcome message',
    cmdUnregister: 'disconnect from me',
    cmdUptime: 'bot uptime info',
    cmdWhoAmI: 'information about you'
};
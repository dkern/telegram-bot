'use strict';

module.exports = {
    // server console messages
    serverStarting: '${name} is running ...',
    serverStopping: '${name} is shutting down ...',
    serverRegisterCms: 'Command \'${cmd}\' registered ...',

    // user authentication
    userAllowed: 'Ich freue mich dich registreiren zu dürfen! Ich habe die Freigabe dir ab sofort benötigte Informationen zukommen zu lassen.',
    userRejected: [
        'Ich habe leider keine Freigabe, um mit dir zu sprechen. Bitte wende dich an meinen Entwickler. Du weißt schon.',
        'Permission denied.',
        'Für dich ist leider keine Sicherheitsfreigabe vorhanden. Ich darf nicht mit dir sprechen.'
    ],

    // command responses
    start: 'Hallo, ich bin *${name}*, Eisbehr\'s persönlicher Homebot. Ich habe Kontrolle über alle Haus-Systeme und verteile wenn nötig Informationen.',
    help: '*Du brauchst Hilfe?*\n\nMit folgenden Kommandos kannst du mir Befehle erteilen oder Informationen anfragen:',
    unregistered: 'Bestätigt. Du erhälst keine weiteren Updates von mir.',
    whoamiRegistered: 'Du bist *${name}* und ich habe dich seit dem *${date}* um *${time}* registriert.',
    whoamiUnregistered: 'Du bist *${name}*, ich kann allerdings keine Daten zu dir finden.',

    // command help
    cmdHelp: 'prints this help',
    cmdStart: 'start interactions',
    cmdSayHello: 'welcome message',
    cmdUnregister: 'disconnect from me',
    cmdWhoAmI: 'information about you'
};
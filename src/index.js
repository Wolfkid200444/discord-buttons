const { Structures } = require("discord.js");
const Message = require('./Classes/Message');
const TextChannel = require('./Classes/TextChannel');
const NewsChannel = require('./Classes/NewsChannel');
const DMChannel = require('./Classes/DMChannel');
const MessageButton = require('./Classes/MessageButton');
const INTERACTION_CREATE = require('./Classes/INTERACTION_CREATE.js');

module.exports = (client) => {

    if (require('./Util').checkDjsVersion() === false) {
        throw new Error('The discord.js version must be v12 or high');
    }

    Structures.extend("Message", () => Message);
    Structures.extend("TextChannel", () => TextChannel);
    Structures.extend("NewsChannel", () => NewsChannel);
    Structures.extend("DMChannel", () => DMChannel);

    client.ws.on('INTERACTION_CREATE', data => {

        if (!data.message) return;

        if (data.data.component_type === 2) {
            const button = new INTERACTION_CREATE(client, data);

            client.emit('clickButton', button);
        }
    });

    return {
        MessageButton: MessageButton,
        ButtonInteraction: INTERACTION_CREATE,
    };
}

module.exports.MessageButton = MessageButton;
module.exports.ButtonInteraction = INTERACTION_CREATE;

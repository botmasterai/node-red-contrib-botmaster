var setupBotmaster = require('./botmaster').setupBotmaster;
var TelegramBot = require('botmaster').botTypes.TelegramBot;
var setupBotStatus = require('./botmaster').setupBotStatus;

module.exports = function(RED) {
    function TelegramBotNode(config) {
        RED.nodes.createNode(this,config);

        try {
            var telegramBot = new TelegramBot({
                credentials: {
                    authToken: config.authToken
                },
                webhookEndpoint: config.webhookEndpoint
            });
            var setup = setupBotmaster(RED, this, telegramBot);
            var botmaster = setup.botmaster;
            botmaster.addBot(telegramBot);
            setupBotStatus(telegramBot, this, telegramBot);
            setup.done(telegramBot);
        } catch (err) {
            this.status({fill:'red', shape: 'dot', text: 'invalid config'});
            this.error(err);
        }
    }
    RED.nodes.registerType('telegramBot', TelegramBotNode);
};

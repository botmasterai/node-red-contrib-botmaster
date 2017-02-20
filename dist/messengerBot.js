var setupBotmaster = require('./botmaster').setupBotmaster;
var MessengerBot = require('botmaster').botTypes.MessengerBot;
var setupBotStatus = require('./botmaster').setupBotStatus;

module.exports = function(RED) {
    function MessengerBotNode(config) {
        RED.nodes.createNode(this,config);
        try {
            var messengerBot = new MessengerBot({
                credentials: {
                    verifyToken: config.verifyToken,
                    pageToken: config.pageToken,
                    fbAppSecret: config.fbAppSecret
                },
                webhookEndpoint: config.webhookEndpoint
            });
            var setup = setupBotmaster(RED, this, messengerBot);
            var botmaster = setup.botmaster;
            botmaster.addBot(messengerBot);
            setupBotStatus(messengerBot, this);
            setup.done(messengerBot);
        } catch (err) {
            this.status({fill:'red', shape: 'dot', text: 'invalid config'});
            this.error(err);
        }

    }
    RED.nodes.registerType('messengerBot', MessengerBotNode);
};

var setupBotmaster = require('./botmaster').setupBotmaster;
var MessengerBot = require('botmaster').botTypes.MessengerBot;

module.exports = function(RED) {
    function MessengerBotNode(config) {
        RED.nodes.createNode(this,config);
        var setup = setupBotmaster(RED);
        var botmaster = setup.botmaster;
        var messengerBot = new MessengerBot({
            credentials: {
                verifyToken: config.verifyToken,
                pageToken: config.pageToken,
                fbAppSecret: config.fbAppSecret
            },
            webhookEndpoint: config.webhookEndpoint
        });
        botmaster.addBot(messengerBot);

        setup.done(messengerBot);


    }
    RED.nodes.registerType('messengerBot', MessengerBotNode);
};

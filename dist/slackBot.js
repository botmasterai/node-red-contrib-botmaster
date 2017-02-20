var setupBotmaster = require('./botmaster').setupBotmaster;
var SlackBot = require('botmaster').botTypes.SlackBot;
var setupBotStatus = require('./botmaster').setupBotStatus;

module.exports = function(RED) {
    function SlackBotNode(config) {
        RED.nodes.createNode(this,config);

        try {
            var slackBot = new SlackBot({
                credentials: {
                    clientId: config.clientId,
                    clientSecret: config.clientSecret,
                    verificationToken: config.verificationToken
                },
                webhookEndpoint: config.webhookEndpoint
            });
            var setup = setupBotmaster(RED, this, slackBot);
            var botmaster = setup.botmaster;
            botmaster.addBot(slackBot);
            setupBotStatus(slackBot, this);
            setup.done(slackBot);
        } catch (err) {
            this.status({fill:'red', shape: 'dot', text: 'invalid config'});
            this.error(err);
        }

    }
    RED.nodes.registerType('slackBot', SlackBotNode);
};

var setupBotmaster = require('./botmaster').setupBotmaster;
var TwitterBot = require('botmaster').botTypes.TwitterBot;
var setupBotStatus = require('./botmaster').setupBotStatus;

module.exports = function(RED) {
    function TwitterBotNode(config) {
        RED.nodes.createNode(this,config);

        try {
            var twitterBot = new TwitterBot({
                credentials: {
                    consumerKey: config.consumerKey,
                    consumerSecret: config.consumerSecret,
                    accessToken: config.accessToken,
                    accessTokenSecret: config.accessTokenSecret
                },
            });
            var setup = setupBotmaster(RED, this, twitterBot);
            var botmaster = setup.botmaster;
            botmaster.addBot(twitterBot);
            setupBotStatus(twitterBot, this, twitterBot);
            setup.done(twitterBot);
        } catch (err) {
            this.status({fill:'red', shape: 'dot', text:'invalid config'});
            this.error(err);
        }

    }
    RED.nodes.registerType('twitterBot', TwitterBotNode);
};

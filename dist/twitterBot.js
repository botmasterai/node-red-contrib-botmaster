var setupBotmaster = require('./botmaster').setupBotmaster;
var TwitterBot = require('botmaster').botTypes.TwitterBot;

module.exports = function(RED) {
    function TwitterBotNode(config) {
        RED.nodes.createNode(this,config);

        var setup = setupBotmaster(RED);
        var botmaster = setup.botmaster;
        var twitterBot = new TwitterBot(config);
        botmaster.addBot(twitterBot);

        setup.done(twitterBot);

    }
    RED.nodes.registerType('twitterBot', TwitterBotNode);
};

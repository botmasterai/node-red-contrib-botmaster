var setupBotmaster = require('./botmaster');
var TwitterBot = require('botmaster').botTypes.TwitterBot;

module.exports = function(RED) {
    function TwitterBotNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var botmaster = setupBotmaster(RED);
        var twitterBot = new TwitterBot(config);
        botmaster.addBot(twitterBot);

        this.on('input', function(msg) {
            twitterBot.sendMessage(msg);
        });

        twitterBot.on('update', function(update) {
            node.send({
                update: update,
                payload: update
            });
        });

    }
    RED.nodes.registerType('twitterBot', TwitterBotNode);
};

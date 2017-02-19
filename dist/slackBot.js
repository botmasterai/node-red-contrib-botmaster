var setupBotmaster = require('./botmaster');
var SlackBot = require('botmaster').botTypes.SlackBot;

module.exports = function(RED) {
    function SlackBotNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var botmaster = setupBotmaster(RED);
        var slackBot = new SlackBot(config);
        botmaster.addBot(slackBot);

        this.on('input', function(msg) {
            slackBot.sendMessage(msg);
        });

        slackBot.on('update', node.send);

    }
    RED.nodes.registerType('slackBot', SlackBotNode);
};

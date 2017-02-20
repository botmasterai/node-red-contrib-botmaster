var setupBotmaster = require('./botmaster').setupBotmaster;
var SlackBot = require('botmaster').botTypes.SlackBot;

module.exports = function(RED) {
    function SlackBotNode(config) {
        RED.nodes.createNode(this,config);

        var slackBot = new SlackBot(config);
        var setup = setupBotmaster(RED);
        var botmaster = setup.botmaster;
        botmaster.addBot(slackBot);
        
        setup.done(slackBot);

    }
    RED.nodes.registerType('slackBot', SlackBotNode);
};

var setupBotmaster = require('./botmaster');
var TelegramBot = require('botmaster').botTypes.TelegramBot;

module.exports = function(RED) {
    function TelegramBotNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var botmaster = setupBotmaster(RED);
        var telegramBot = new TelegramBot(config);
        botmaster.addBot(telegramBot);

        this.on('input', function(msg) {
            telegramBot.sendMessage(msg);
        });

        telegramBot.on('update', node.send);

    }
    RED.nodes.registerType('telegramBot', TelegramBotNode);
};

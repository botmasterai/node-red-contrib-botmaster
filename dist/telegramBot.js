var setupBotmaster = require('./botmaster').setupBotmaster;
var TelegramBot = require('botmaster').botTypes.TelegramBot;

module.exports = function(RED) {
    function TelegramBotNode(config) {
        RED.nodes.createNode(this,config);

        var setup = setupBotmaster(RED);
        var botmaster = setup.botmaster;
        var telegramBot = new TelegramBot(config);
        botmaster.addBot(telegramBot);

        setup.done(telegramBot);
    }
    RED.nodes.registerType('telegramBot', TelegramBotNode);
};

var setupBotmaster = require('./botmaster').setupBotmaster;

module.exports = function(RED) {
    function BotmasterInNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var botmaster = setupBotmaster(RED, node).botmaster;

        botmaster.on('update', function(bot, update) {
            node.send({
                bot: bot,
                payload: update,
                update: update
            });
        });
    }
    RED.nodes.registerType('bot update', BotmasterInNode);
};

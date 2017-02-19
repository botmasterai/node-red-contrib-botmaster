var setupBotmaster = require('./botmaster');

module.exports = function(RED) {
    function BotmasterOutNode(config) {
        RED.nodes.createNode(this,config);

        var botmaster = setupBotmaster(RED);

        this.on('input', function(msg) {
            botmaster.sendMessage(msg);
        });

    }
    RED.nodes.registerType('botmaster-out', BotmasterOutNode);
};

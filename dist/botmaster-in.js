var setupBotmaster = require('./botmaster');

module.exports = function(RED) {
    function BotmasterInNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var botmaster = setupBotmaster(RED);

        botmaster.on('update', node.send);
    }
    RED.nodes.registerType('botmaster-in', BotmasterInNode);
};

module.exports = function(RED) {
    function BotmasterOutNode(config) {
        RED.nodes.createNode(this,config);

        this.on('input', function(msg) {
            msg.bot[config.function](msg.payload);
        });

    }
    RED.nodes.registerType('botmaster out', BotmasterOutNode);
};

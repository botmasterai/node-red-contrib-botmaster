
module.exports = function(RED) {
    function ActionStartNode(config) {
        RED.nodes.createNode(this,config);

        this.on('input', function(msg) {
            msg.done(msg.payload);
        });


    }
    RED.nodes.registerType('action end', ActionStartNode);
};

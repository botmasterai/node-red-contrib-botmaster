
module.exports = function(RED) {
    function ActionStartNode(config) {
        RED.nodes.createNode(this,config);

        this.on('input', msg => {
            msg.next(null, msg.payload).then( () => {
                this.send(msg);
            });
        });



    }
    RED.nodes.registerType('action end', ActionStartNode);
};

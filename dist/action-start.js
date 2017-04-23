var addAction = require('./botmaster').addAction;

module.exports = function(RED) {
    function ActionStartNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;


        var spec = {
            controller: function(params, next) {
                node.send({
                    params: params,
                    next: next
                });
            }
        };

        addAction(config.tag, spec);



    }
    RED.nodes.registerType('action-start', ActionStartNode);
};

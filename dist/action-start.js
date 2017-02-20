var addAction = require('./botmaster').addAction;
var Promise = require('bluebird');

module.exports = function(RED) {
    function ActionStartNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;


        var spec = {
            controller: function(params) {
                return new Promise(function(resolve) {
                    node.send({
                        params: params,
                        done: resolve
                    });
                });
            }
        };

        addAction(config.tag, spec);



    }
    RED.nodes.registerType('action start', ActionStartNode);
};

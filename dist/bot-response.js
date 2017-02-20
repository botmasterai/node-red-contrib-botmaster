var R = require('ramda');

var defaultRecipientLens = R.lensPath(['update', 'sender', 'id']);
var getRecipient = function(update) {
    return R.compose(
        R.when(R.isNil, R.always(R.view(defaultRecipientLens, update))),
        R.prop('recipientId')
    )(update);
};

module.exports = function(RED) {
    function BotmasterOutNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        this.on('input', function(msg) {
            var promise;
            switch (config.function) {
                case 'sendMessage':
                    promise = msg.bot.sendMessage(msg.payload);
                    break;
                case 'reply':
                    promise = msg.bot.reply(msg.update, msg.payload);
                    break;
                case 'sendMessageTo':
                    promise = msg.bot.sendMessageTo(msg.payload, getRecipient(msg));
                    break;
                case 'sendTextMessageTo':
                    promise = msg.bot.sendTextMessageTo(msg.payload, getRecipient(msg));
                    break;
                case 'sendAttachmentTo':
                    promise = msg.bot.sendAttachmentTo(msg.payload, getRecipient(msg));
                    break;
                case 'sendAttachmentFromURLTo':
                    promise = msg.bot.sendAttachmentFromURLTo(msg.payload, getRecipient(msg));
                    break;
                case 'sendIsTypingMessageTo':
                    promise = msg.bot.sendIsTypingMessageTo(getRecipient(msg));
                    break;
                case 'sendDefaultButtonMessageTo':
                    promise = msg.bot.sendDefaultButtonMessageTo(msg.payload, getRecipient(msg));
                    break;
                case 'cascade':
                    promise = msg.bot.cascade(msg.payload, getRecipient(msg));
                    break;
                case 'sendCascadeTo':
                    promise = msg.bot.sendCascadeTo(msg.payload, getRecipient(msg));
            }

            promise
            .then(function(){
                node.send(msg);
            })
            .catch(function(error) {
                node.error(error);
            });
        });

    }
    RED.nodes.registerType('bot response', BotmasterOutNode);
};

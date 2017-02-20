/**
 * Singleton botmaster instance for node-red
 * Configures botmaster with middleware
 * TODO: Could be assigned in flow scope
 */

var Botmaster = require('botmaster');
var FulfillWare = require('botmaster-fulfill').FulfillWare;
var actions = require('botmaster-fulfill-actions');

var botmaster;
var fulfill = FulfillWare({actions: actions});

function addAction(name, spec) {
    actions[name] = spec;
}

function setupBotmaster(RED, node, bot) {
    var done = function(bot) {
        bot.use('outgoing', fulfill);
    };

    if (!botmaster) {
        botmaster = new Botmaster({app: RED.httpNode});
        botmaster.on('error', function(someBot, error) {
            if (bot === someBot) {
                node.status({fill: 'red', shape: 'dot', text: 'bot error'});
                node.error(error);
            }
        });
        node.on('close', function() {
            //botmaster.server.close();
            botmaster = false;
        });
    }
    return {botmaster: botmaster, done: done};
}

/**
 * Show a little status next to each configured bot
 */
function setupBotStatus(bot, node) {
    var updates = 0;
    var replies = 0;
    var updateText = function() {
        return updates !== 1 ? updates + ' updates' : updates + ' update';
    };
    var replyText= function() {
        return replies !== 1 ? replies + ' replies': replies + ' reply';
    };
    var updateStatus = function() {
        node.status({fill: 'green', shape: 'dot',
            text: updateText() + '; ' + replyText()
        });
    };
    node.status({fill: 'grey', shape: 'ring', text: 'inactive'});
    bot.on('update', function() {
        updates += 1;
        updateStatus();
    });

    bot.on('error', function(error) {
        node.error(error);
        node.status({fill: 'red', shape: 'dot', text: 'error'});
    });

    bot.use('outgoing', function() {
        replies += 1;
        updateStatus();
    });
}

module.exports = {
    setupBotmaster: setupBotmaster,
    addAction: addAction,
    setupBotStatus: setupBotStatus
};

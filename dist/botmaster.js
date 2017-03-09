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
    var done = function done(bot) {
        bot.use('outgoing', fulfill);
    };

    if (!botmaster) {
        botmaster = new Botmaster({
            server: RED.server,
            app: RED.httpNode
        });
        botmaster.on('error', function(someBot, error) {
            if (bot === someBot) {
                node.status({fill: 'red', shape: 'dot', text: 'bot error'});
                node.error(error);
            }
        });
    }

    if (node && bot) {

        node.on('close', function() {
            bot.removeAllListeners();
            if (bot.app)
                bot.app._router.stack.forEach(function(route,i,routes) {
                    routes.splice(i,1);
                });
            if (botmaster) {
                botmaster.server.removeAllListeners('request');
                botmaster = false;
            }
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
    var updateText = function updateText() {
        return updates !== 1 ? updates + ' updates' : updates + ' update';
    };
    var replyText= function replyText() {
        return replies !== 1 ? replies + ' replies': replies + ' reply';
    };
    var updateStatus = function updateStatus() {
        node.status({fill: 'green', shape: 'dot',
            text: updateText() + '; ' + replyText()
        });
    };
    node.status({fill: 'grey', shape: 'ring', text: 'inactive'});
    bot.on('update', function updateCallback() {
        updates += 1;
        updateStatus();
    });

    bot.on('error', function errorCallback(error) {
        node.error(error);
        node.status({fill: 'red', shape: 'dot', text: 'error'});
    });

    bot.use('outgoing', function outgoingCallback(bot, update, message, next) {
        replies += 1;
        updateStatus();
        next();
    });
}

module.exports = {
    setupBotmaster: setupBotmaster,
    addAction: addAction,
    setupBotStatus: setupBotStatus
};

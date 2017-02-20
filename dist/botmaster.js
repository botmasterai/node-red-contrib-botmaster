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
    actions[name] = spec
}

function setupBotmaster(RED) {
    var done = function(bot) {
        bot.use('outgoing', fulfill);
    };

    if (!botmaster) {
        botmaster = new Botmaster({app: RED.httpNode});
        botmaster.on('error', function(bot, error) {
            console.error(error);
        });
    }
    return {botmaster: botmaster, done: done};
}

module.exports = {
    setupBotmaster: setupBotmaster,
    addAction: addAction
};

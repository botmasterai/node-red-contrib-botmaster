/**
 * Singleton botmaster instance for node-red
 * TODO: Could be based on flow
 */

var Botmaster = require('botmaster');

var botmaster;

function setupBotmaster(RED) {
    if (botmaster)
        return botmaster;

    botmaster = new Botmaster({app: RED.app});

    return botmaster;
}

module.exports = setupBotmaster;

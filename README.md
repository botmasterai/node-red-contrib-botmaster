***Experimental - looking for new maintainer***

# Nodes for Botmaster

Node-red nodes for [Botmaster](http://botmasterai.com/), the simple framework for serious chatbot projects.

## Sample flow

![Sample flow image](https://raw.githubusercontent.com/botmasterai/node-red-contrib-botmaster/master/images/sample%20flow.png)

You can copy this flow below.

## Supported Bots

* Facebook Messenger
* Slack
* Twitter
* Telegram

## Middleware

Botmaster supports middleware, which can extend the functionality of your bot or make it easier to make a clever bot.

We've setup some middleware for you in the node-red edition of botmaster to make it easy!

### Fulfill action tags

Fulfill utilises the concept of separation of concerns. You write an "action handler" once and using fulfill this action handler can be called anywhere from the bots output simply by putting an xml tag matching the name of the action handler.


For example the sample flow includes a `<hi />` tag. This is used in a function node which greets the user when they write to the bot.

```js
msg.payload = '<hi /> <pause wait=5000 /> How are you?'
return msg;
```

The hi tag has a flow like the following.

![Hi tag flow](https://raw.githubusercontent.com/botmasterai/node-red-contrib-botmaster/master/images/action%20tag.png)

The first function node simply sets `msg.payload` to "hi there", and returns the msg. The action end node then uses this payload to replace `<hi />` in the message to the user with "hi there." The flow does not end there however, once this message containing hi has been sent the two nodes after the action end node retrieves a random giphy tagged with "Bot" from giphy.com and sends it to the user.

This leads to an experience like the following:

<img src="https://raw.githubusercontent.com/botmasterai/node-red-contrib-botmaster/master/images/sample%20experience.gif" width="200px" alt="sample experience gif" />

Note that the pause tag splits the `<hi />` into its own message and waits 5 seconds before sending how are you. So if it takes longer than 5 seconds to get the giphy the "how are you" will come before the giphy.

Read more about [fulfill](http://botmasterai.com/tutorials/using-fulfill/) and also read the docs of the [standard actions](https://github.com/botmasterai/botmaster-fulfill-actions) that are included.



## When to use botmaster with Node-Red

Node-RED is a great way to get started with Node.js. Its also great for prototyping. However, if you want to take your bot into production you should probably consider using Botmaster without Node-RED. This will give you greater control and reliability and a more minimal stack. If you want to migrate from Node-RED, that's easy! There are several tutorials in plain Node.js at [Botmasterai.com](http://botmasterai.com/) and all the functionality provided through the Botmaster nodes is also available though the vanilla packages.

## Flow

You can use this flow to get started. Simply copy and use the menu option "import".

<img src="https://raw.githubusercontent.com/botmasterai/node-red-contrib-botmaster/master/images/import%20flow.png" width="300px" alt="how to import" />

```
[{"id":"671b7971.aa9278","type":"function","z":"6b02241f.af3a2c","name":"say hello with actions","func":"msg.payload = '<hi /> <pause />How are you?'\nreturn msg;","outputs":1,"noerr":0,"x":720,"y":500,"wires":[["d8252620.cb9708"]]},{"id":"d8252620.cb9708","type":"bot response","z":"6b02241f.af3a2c","name":"","function":"reply","x":890,"y":500,"wires":[[]]},{"id":"54599219.f6a9cc","type":"action start","z":"6b02241f.af3a2c","name":"","tag":"hi","x":150,"y":680,"wires":[["d74a0b5b.5f38b8"]]},{"id":"fd25f621.c98cf8","type":"action end","z":"6b02241f.af3a2c","name":"","x":430,"y":680,"wires":[["7295d23f.818d4c"]]},{"id":"d74a0b5b.5f38b8","type":"function","z":"6b02241f.af3a2c","name":"hi there","func":"msg.payload = 'hi there';\nreturn msg;","outputs":1,"noerr":0,"x":278,"y":681,"wires":[["fd25f621.c98cf8"]]},{"id":"833d1c92.eb86b","type":"bot response","z":"6b02241f.af3a2c","name":"","function":"sendIsTypingMessageTo","x":350,"y":500,"wires":[["2f66929f.5c2dbe"]]},{"id":"2f66929f.5c2dbe","type":"delay","z":"6b02241f.af3a2c","name":"","pauseType":"delay","timeout":"5","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"x":540,"y":500,"wires":[["671b7971.aa9278"]]},{"id":"7f51c5b8.51456c","type":"function","z":"6b02241f.af3a2c","name":"hello actions","func":"msg.payload = '<hi /> <pause wait=5000 /> How are you?'\nreturn msg;","outputs":1,"noerr":0,"x":310,"y":300,"wires":[["7201701e.450db"]]},{"id":"7201701e.450db","type":"bot response","z":"6b02241f.af3a2c","name":"","function":"reply","x":450,"y":300,"wires":[[]]},{"id":"6e4878e7.1df408","type":"bot update","z":"6b02241f.af3a2c","name":"","x":170,"y":300,"wires":[["7f51c5b8.51456c"]]},{"id":"8f4c4c08.b008a","type":"bot update","z":"6b02241f.af3a2c","name":"","x":170,"y":500,"wires":[[]]},{"id":"99b3d30e.9973e","type":"watson-conversation-v1","z":"6b02241f.af3a2c","name":"","workspaceid":"","multiuser":true,"context":true,"x":430,"y":400,"wires":[["f9061c84.29dd1"]]},{"id":"e4f9bdbf.41cc6","type":"bot update","z":"6b02241f.af3a2c","name":"","x":170,"y":400,"wires":[[]]},{"id":"f507eb6a.745f18","type":"bot response","z":"6b02241f.af3a2c","name":"","function":"reply","x":690,"y":400,"wires":[[]]},{"id":"ab29bae2.53d5c8","type":"function","z":"6b02241f.af3a2c","name":"<->","func":"if (msg.update.message) {\n   msg.payload = msg.update.message.text;\n   msg.user = msg.update.sender.id;\n   return msg; \n}\n","outputs":1,"noerr":0,"x":290,"y":400,"wires":[["99b3d30e.9973e"]]},{"id":"f9061c84.29dd1","type":"function","z":"6b02241f.af3a2c","name":"<->","func":"msg.payload = msg.payload.output.text;\nreturn msg;","outputs":1,"noerr":0,"x":570,"y":400,"wires":[["f507eb6a.745f18"]]},{"id":"dac06b1c.9a3b78","type":"comment","z":"6b02241f.af3a2c","name":"Configure each bot","info":"","x":130,"y":60,"wires":[]},{"id":"e0a02d3b.7bb95","type":"comment","z":"6b02241f.af3a2c","name":"Handling updates","info":"","x":120,"y":200,"wires":[]},{"id":"fab7f834.454c38","type":"comment","z":"6b02241f.af3a2c","name":"Simple hello world","info":"","x":210,"y":260,"wires":[]},{"id":"43fe4a5e.733834","type":"comment","z":"6b02241f.af3a2c","name":"Using an NLU service","info":"","x":220,"y":360,"wires":[]},{"id":"8f68dde6.6f4d7","type":"comment","z":"6b02241f.af3a2c","name":"Chaining response tactics","info":"","x":230,"y":460,"wires":[]},{"id":"7e984d08.424714","type":"comment","z":"6b02241f.af3a2c","name":"Defining actions","info":"","x":100,"y":600,"wires":[]},{"id":"5d4767f4.f094d8","type":"function","z":"6b02241f.af3a2c","name":"sendUrl","func":"var imageUrl = msg.payload.data.image_url;\nmsg.params.bot.sendAttachmentFromURLTo(\n    \"image\",\n    imageUrl,\n    msg.params.update.sender.id, \n    {ignoreMiddleware:true}\n);\n/*msg.params.bot.sendAttachmentTo(\n    {\n        \"type\":\"image\",\n        \"payload\":{\n            \"url\": imageUrl\n        }\n    },\n    msg.params.update.sender.id, \n    {ignoreMiddleware:true}\n);*/\nreturn msg;","outputs":1,"noerr":0,"x":760,"y":680,"wires":[[]]},{"id":"7295d23f.818d4c","type":"http request","z":"6b02241f.af3a2c","name":"random giph","method":"GET","ret":"obj","url":"http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=bot","tls":"","x":610,"y":680,"wires":[["5d4767f4.f094d8"]]},{"id":"9d42817a.9dfc6","type":"comment","z":"6b02241f.af3a2c","name":"giphy","info":"Here we retrive a random giphy image\n\nYou can read more about the api here\n\nhttps://github.com/Giphy/GiphyAPI#random-endpoint","x":590,"y":640,"wires":[]},{"id":"e0814abf.2084d8","type":"slackBot","z":"6b02241f.af3a2c","name":"","clientId":"","clientSecret":"","webhookEndpoint":"","x":380,"y":140,"wires":[]},{"id":"aba9fc12.2b6ff","type":"telegramBot","z":"6b02241f.af3a2c","name":"","authToken":"","webhookEndpoint":"","x":550,"y":140,"wires":[]},{"id":"372a5cb5.9d4c74","type":"twitterBot","z":"6b02241f.af3a2c","name":"","consumerKey":"","consumerSecret":"","accessToken":"","accessTokenSecret":"","x":700,"y":140,"wires":[]},{"id":"6c0129.2685bed8","type":"messengerBot","z":"6b02241f.af3a2c","name":"","verifyToken":"","pageToken":"","fbAppSecret":"","webhookEndpoint":"/","x":220,"y":140,"wires":[]}]
```

# Known issues

The on redeploying a change the node's do not re-initialise properly.

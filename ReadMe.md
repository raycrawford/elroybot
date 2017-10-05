# Setup
* Code in C# or Node
  * Going with Node
* package.json
* botbuilder npm package
  * https://github.com/Microsoft/BotFramework-Emulator
  * `npm install -s botbuilder restify`
  * `npm install --save-dev @types/restify`
  * boiler plate available at: https://github.com/MicrosoftDX/generator-botbuilder

## results object from prompt:
```
{
  "resumed": 0,
  "response": "hi",
  "childId": "BotBuilder:prompt-text"
}
```

## Dialogs
* Dialog stack
  * session.beginDialog()
  * session.endDialog()
  * session.endDialogWithResults()
  * session.replaceDialog('name')

## Managing state
### Lifespans
* session.privateConverstationData
  * session.endConversation()
* session.conversationData
  * session.endConversation()
* session.dialogData
  * cleared by endDialog()
* session.userData
  * persists for the lifespan of bot

Conversation is a collection of dialogs.

By default, state is stored in Azure Tables.  This limits data to 32k per user.  If more is necessary, store it locally or in CosmoDB.  You would register a different state provider.





# Resources:
* https://github.com/Microsoft/BotBuilder/tree/master/Node/examples
* bots.botframework.com
  * bots
  * Node object reference


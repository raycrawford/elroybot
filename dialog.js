const builder = require('botbuilder')
const restify = require('restify')

const connector = new builder.ChatConnector();
const bot = new builder.UniversalBot(
    connector,
    [
        (session) => {
            session.beginDialog('ensureProfile', session.userData.profile);
        },
        (session, results) => {
            const profile = session.userData.profile = results.response;
            session.endConversation(`Hello ${profile.name}.  I love ${profile.company}!`);
        }
    ]
);

bot.dialog('ensureProfile', [
    (session, args, next) => {
        session.dialogData.profile = args || {};
        if(!session.dialogData.profile.name) {
            builder.Prompts.text(session, `What's your name?`);
        } else {
            next();
        }
    },
    (session, results, next) => {
        if(results.response) {
            session.dialogData.profile.name = results.response;
        }
        if(!session.dialogData.profile.company) {
            builder.Prompts.text(session, `What company do you work for?`);
        } else {
            next();
        }
    },
    (session, results) => {
        if(results.response) {
            session.dialogData.profile.company = results.response;
        }
        session.endDialogWithResult({ response: session.dialogData.profile });
    }
]);

bot.dialog('help', function (session, args, next) {
    //Send a help message
    session.endDialog("Global help menu.");
})
// Once triggered, will start a new dialog as specified by
// the 'onSelectAction' option.
.triggerAction({
    matches: /^help$/i,
    onSelectAction: (session, args, next) => {
        // Add the help dialog to the top of the dialog stack 
        // (override the default behavior of replacing the stack)
        session.beginDialog(args.action, args);
    }
});


const server = restify.createServer();
server.post('/api/messages', connector.listen());
server.listen(
    process.env.PORT || 3978,
    () => console.log('Server Up!')
)

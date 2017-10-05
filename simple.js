const builder = require('botbuilder')
const restify = require('restify')

const connector = new builder.ChatConnector();
const bot = new builder.UniversalBot(
    connector,
    [
        (session) => {
            builder.Prompts.text(session, 'Hello, what is your name?');
        },
        (session, results) => {
            session.endDialog("Hello, " + results.response + ".");
        }
    ]
);

const server = restify.createServer();
server.post('/api/messages', connector.listen());
server.listen(
    process.env.PORT || 3978,
    () => console.log('Server Up!')
)


// bot.dialog('/', [function(session){
//     builder.Prompts.text(session, "What's your name?")
// }, function(session, results, next) {
//     var name = results.response;
//     session.send("Hello, " + name + ".  Welcome to our house!");
// }
// ]
// )
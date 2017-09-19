const Discord = require('discord.js')
const talkAboutNamedPeople = require('./people.talk')
const utils = require('./utils')
const definitions = require('./definitions')
const { getPubgPrices, pipePubgPrices } = require('./steam')
const pubg = require('./pubg')
const client = new Discord.Client()

client.on('ready', () => { 
    console.log('Bot ready.') 
    runAutomatedCommands()
});

client.on('message', message => {
    /* avoid execution if parsed message is from a bot */    
    if (message.author.bot) return
        
    checkCommands(message, client);
    checkNamedPeople(message);    
    checkPubgRank(message);
})

client.on('guildMemberAdd', (member) => {
    const channel = client.channels.find('name', definitions.channels.random)
    const everyone = member.guild.roles.find('name', definitions.roles.everyone)
    const greetingMessage = definitions.getGreetingMessage();

    if (!channel) return
    channel.send(`${everyone}, ${greetingMessage} Welcome ${member}!`)
})

//client.login(process.env.BIGOTE_BOT_TOKEN)
client.login("MzQxMzQzNDkzMzg3NDUyNDE5.DKKiNg.cYG88__U9wYAU6BnoDBbnXnz8LU")

function checkNamedPeople(message) {
    let answer

    if (utils.takeChance(10)) {
        answer = talkAboutNamedPeople(message.content)
        if (answer)
            message.channel.send(answer)
    } 
}

function checkPubgRank(serverContent) {
    let message = serverContent.content.toLowerCase();
    const botCommands = definitions.getBotCommands();

    if (message.indexOf(botCommands.pubgRank.command) > -1) {
        let playerName = message.split(" ")[1];

        if (playerName) {
            pubg.getRankByPlayerName(playerName);
            return
        }

        serverContent.channel.send("Please write a player name.");
    }
};

function checkCommands(message, client) {
    const botCommands = definitions.getBotCommands();
    
    switch (message.content.toLowerCase()) {
        case botCommands.pubgMarket.command:
            return getPubgPrices()
            .then(pipePubgPrices)
            .then(msg => message.channel.send(msg))
            .catch(err => console.log(`[Error] on http request for pubg market`, err))
            break;
    
        case botCommands.offtopic.command:
            message.channel.send(process.env.OFFTOPIC)
            break;
        
        case botCommands.cleanChannels.command:
            cleanChannels()
            break;
        
        case botCommands.help.command:
            message.channel.send(definitions.getHelpMessage())
            break;

        case botCommands.pubgSchedule.command:
            message.channel.send(definitions.getPubgSchedule())
            break;

        default:
            break;
    }
}

function cleanChannels() {
    let channels = client.channels.filterArray( chan => chan.type == definitions.channelTypes.voice &&
        definitions.exclusiveVoiceChannels.indexOf(chan.name.toLowerCase()) == -1 &&
        chan.members.size == 0);

    channels.forEach(chan =>                 
        chan.delete()
        .then(console.log(`Empty voice channels were deleted`))
        .catch(err => console.log(`[Error] while deleting a voice channel`, err))
    )
}

function runAutomatedCommands() {
    setInterval(() => { cleanChannels() } ,1800000)
}
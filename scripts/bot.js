const Discord = require('discord.js')
const talkAboutNamedPeople = require('./people.talk')
const utils = require('./utils')
const definitions = require('./definitions')
const { getPubgPrices, pipePubgPrices } = require('./steam')
const client = new Discord.Client()

client.on('ready', () => console.log('Bot ready.'));

client.on('message', message => {
    /* avoid execution if parsed message is from a bot */    
    if (message.author.bot) return
        
    checkCommands(message, client);
    checkNamedPeople(message);    
})

client.on('guildMemberAdd', (member) => {
    const channel = client.channels.find('name', definitions.channels.random)
    const everyone = member.guild.roles.find('name', definitions.roles.everyone)
    const greetingMessage = definitions.getGreetingMessage();

    if (!channel) return
    channel.send(`${everyone}, ${greetingMessage} Welcome ${member}!`)
})

client.login('MzQxMzQzNDkzMzg3NDUyNDE5.DG0i-A.4nW_91bDO5MGaTsrxuT_vpuK7Oo')

function checkNamedPeople(message) {
    let answer

    if (utils.takeChance(10)) {
        answer = talkAboutNamedPeople(message.content)
        if (answer)
            message.channel.send(answer)
    } 
}

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
            message.channel.send('process.env.OFFTOPIC')
            break;
        
        case botCommands.cleanChannels.command:
            let channels = client.channels.filterArray( chan => chan.type == definitions.channelTypes.voice &&
                                                                definitions.exclusiveVoiceChannels.indexOf(chan.name.toLowerCase()) == -1 &&
                                                                chan.members.size == 0);
            channels.forEach(chan =>                 
                 chan.delete()
                 .then(console.log(`Empty voice channels were deleted`))
                 .catch(err => console.log(`[Error] while deleting a voice channel`, err))
            )

            break;
        
        case botCommands.help.command:
            message.channel.send(definitions.getHelpMessage())
            break;

        default:
            break;
    }
}
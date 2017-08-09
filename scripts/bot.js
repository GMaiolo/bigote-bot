const Discord = require('discord.js')
const talkAboutNamedPeople = require('./people.talk')
const { takeChance } = require('./utils')
const definitions = require('./definitions')
const { getPubgPrices, pipePubgPrices } = require('./steam')
const client = new Discord.Client()

client.on('ready', () => console.log('Bot ready.'));

client.on('message', message => {
    /* avoid execution if parsed message is from a bot */
    if (message.author.bot) return
    let answer
    if (message.content.toLowerCase() === 'pubg market') {
        return getPubgPrices()
            .then(pipePubgPrices)
            .then(message.channel.send)
            .catch(err => console.log(`[Error] on http request for pubg market`, err))
    } else if (takeChance(10)) {
        answer = talkAboutNamedPeople(message.content)
    } else if (/offtopic/ig.test(message.content)) {
        annswer = process.env.OFFTOPIC
    }
    if (answer) {
        message.channel.send(answer)
    }
})

client.on('guildMemberAdd', (member) => {
    const channel = client.channels.find('name', definitions.channels.random)
    const everyone = member.guild.roles.find('name', definitions.roles.everyone)
    const greetingMessage = definitions.getGreetingMessage();

    if (!channel) return
    channel.send(`${everyone}, ${greetingMessage} Welcome ${member}!`)
})

client.login(process.env.BIGOTE_BOT_TOKEN)

const Discord = require('discord.js')
const talkAboutNamedPeople = require('./people.talk')
const { takeChance } = require('./utils')
const client = new Discord.Client()

client.on('ready', () => console.log('Bot ready.'));

client.on('message', message => {
    /* avoid execution if parsed message is from a bot */
    if (message.author.bot) return
    const gotLucky = takeChance(10)
    let answer
    if(gotLucky) {
        answer = talkAboutNamedPeople(message.content)
    } 
    if (answer) {
        message.channel.send(answer)
    }
})

client.on('guildMemberAdd', (guild, member) => {
    console.log(`${member.user.username} joined ${guild.name}`)
    const channel = client.channels.find('random', 'member-log')
    
    if (!channel) return
    channel.send(`Welcome to cartulo, bigote ${member}`)
})

client.login(process.env.BIGOTE_BOT_TOKEN)

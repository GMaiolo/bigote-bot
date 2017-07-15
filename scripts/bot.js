const Discord = require('discord.js')
const Utils = require('./utils')
const persons = require('./persons')
const { firstToLowerCase } = Utils
const client = new Discord.Client()

client.on('ready', () => console.log('Bot ready.'))

client.on('message', message => {
    /* avoid execution if parsed message is from a bot */
    if (message.author.bot) return
    /* when more message dependant bots are added this should be wrapped up in a switch or something */
    let answer = persons.reduce((answer, person) => {
        if (person.test(message.content)) {
            return answer ? `${answer} y ${firstToLowerCase(person.msg)}` : person.msg
        }
        return answer
    }, '')
    if (answer) message.channel.send(answer)
})

client.login(process.env.BIGOTE_BOT_TOKEN)

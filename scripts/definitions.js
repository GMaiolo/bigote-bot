const greetingMessages = ['a new member has joined Cartulo.',
                        'we have a new nerd among us.',
                        'hey, there is anothe nerd in our ranks.']

const commands = {
        pubgMarket: { command: '/pubgmarket', description: 'Get pubg crates value in real time.', public: true },
        offtopic: { command: '/offtopic', description: 'Alert the users to use the correct channel.', public: true },
        cleanChannels: { command: '/cleanchannels', description: 'Delete all voice channels that are not being used.', public: false },
        help: { command: '/help', description: 'List all commands Bigote-bot has.', public: true },
        pubgRank: { command: '/pubgRank', description: 'Shows a player pubg rank. Usage /pubgRank <PubgName>', public: true }
    }

module.exports = {
    roles : {
        everyone: '@everyone',
        dudes: 'dudes',
        admin: 'admin'
    },

    channels : {
        serverStructure: 'server-structure',
        random: 'random',
        hardware: 'hardware-talk'
    },

    channelTypes : {
        voice: 'voice'
    },

    exclusiveVoiceChannels : ['general', 'lobby'],

    getBotCommands: () => {
        return commands;
    },

    getHelpMessage: () => {  
        let response = { 
            embed: {
                color: 3447003,
                title: 'Bigote-Bot Commands:',
                fields: []
            }
        }
        
        for(var propertyName in commands) {
            response.embed.fields.push({
                                    name: `${commands[propertyName].command}`,
                                    value: `*${commands[propertyName].description}*`
                    })
        }
        
        return response;
    },

    getGreetingMessage: () => {
        return greetingMessages[Math.floor(Math.random()*greetingMessages.length)]
    }
}

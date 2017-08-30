const greetingMessages = ['a new member has joined Cartulo.',
                        'we have a new nerd among us.',
                        'hey, there is anothe nerd in our ranks.']

const commands = {
        pubgMarket: { command: '/pubgmarket', description: 'Get pubg crates value in real time.', public: true },
        offtopic: { command: '/offtopic', description: 'Alert the users to use the correct channel.', public: true },
        cleanChannels: { command: '/cleanchannels', description: 'Delete all voice channels that are not being used.', public: false },
        help: { command: '/help', description: 'List all commands Bigote-bot has.', public: true },
        pubgSchedule: {command: '/pubgschedule', description:`Get the training schedule for 062 PLAYERSUNKNOWN'S BATTLEGROUNDS competition team`, public: true},
    }

const pubgSchedule = `@manker 
LUN-JUE : 20:00 a 01:00

@062_GuϟϟfraggeR 
LUN-DOM : 19:00 a 02:00

@Spanish Inquisition 
LUN-JUE : 20:00 a 01:00

@maniqui-nico 
MIE : 20:00 a 00:00

@-062 
LUN-JUE : 20:00 a 00:00

@fpmirabile 
MIE 21:00 a 00:00

@puchuchoni 
LUN : 18:00 a 01:00`

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
    },

    getPubgSchedule: () => {
        return pubgSchedule;
    },
}

const greetingMessages = ['a new member has joined Cartulo.',
                        'we have a new nerd among us.',
                        'one of us... one of us... one of us...',
                        'en taro Cartulo.']

module.exports = {
    roles : {
        everyone: '@everyone'
    },

    channels : {
        serverStructure: 'server-structure',
        random: 'random',
        hardware: 'hardware-talk'
    },

    getGreetingMessage: () => {
        return greetingMessages[Math.floor(Math.random()*greetingMessages.length)]
    }
}

const definitions = require('./definitions')

exports.firstToLowerCase = (str) => str.charAt(0).toLowerCase() + str.slice(1),

exports.takeChance = (percentageChance) => {
    const rand = Math.random() * 100
    return percentageChance >= rand
}

exports.isAdmin = (member) => {
    return member.roles.find('name', definitions.roles.admin) != null
}

exports.hasPermission = (member, command) => {
    return isAdmin(member) || command.public
}

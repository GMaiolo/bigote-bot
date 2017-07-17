exports.firstToLowerCase = (str) => str.charAt(0).toLowerCase() + str.slice(1)

exports.takeChance = (percentageChance) => {
    const rand = Math.random() * 100
    return percentageChance >= rand
}

const { firstToLowerCase } = require('./utils')

const persons = [
    {
        name: 'alfredo',
        test: (str) => /alfio|alfredo|alfre/ig.test(str),
        msg: process.env.ALFREDO_MSG,
    },
    {
        name: 'nico',
        test: (str) => /^nico($|(\s|\W))|nicol(a|á)s/ig.test(str),
        msg: process.env.NICO_MSG,
    },
    {
        name: 'mati',
        test: (str) => /mati|matías/ig.test(str),
        msg: process.env.MATI_MSG,
    },
    {
        name: 'santi',
        test: (str) => /santi|062|capit(a|á)n/ig.test(str),
        msg: process.env.SANTI_MSG,
    },
    {
        name: 'gus',
        test: (str) => /^gus($|(\s|\W))|\s(gus($|(\s|\W)))|afip/ig.test(str),
        msg: process.env.GUS_MSG,
    },
    {
        name: 'guille',
        test: (str) => /guille|iolo|cielo/ig.test(str),
        msg: process.env.GUILLE_MSG,
    },
    {
        name: 'fer',
        test: (str) => /^fer($|(\s|\W))|\s(fer($|(\s|\W)))|nando/ig.test(str),
        msg: process.env.FER_MSG,
    }
]

module.exports = function talkAboutNamedPeople(str) {
    return persons.reduce((answer, person) => {
        if (person.test(str)) {
            return answer ? `${answer} y ${firstToLowerCase(person.msg)}` : person.msg
        }
        return answer
    }, '')
}

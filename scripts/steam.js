const request = require('request-promise')

const marketHashes = [
    'GAMESCOM INVITATIONAL CRATE',
    'SURVIVOR CRATE',
    'WANDERER CRATE',
]

const baseQuery = {
    /* 1 for dollar, 3 for euro */
    currency: 1,
    /* pubg id in steam */
    appid: 578080,
}

const steamMarketUrl = 'http://steamcommunity.com/market/priceoverview/'

exports.getPubgPrices = function (hashesArr = marketHashes) {
    return Promise.all(
        hashesArr.map((hash) => {
            return request({
                uri: steamMarketUrl,
                json: true,
                qs: Object.assign({}, baseQuery, { market_hash_name: hash })
            })
            .then(res => Object.assign(res, { name: hash }))
            .catch(() => console.log(`[Error] on http request ${hash}`))
        })
    )
}


/*
{  
     success: true,
     lowest_price: '$2.23',
     volume: '70,579',
     median_price: '$2.30',
     name: 'GAMESCOM INVITATIONAL CRATE' 
}
*/
const markup = {
    start: '\`\`\`py\n',
    end: '\`\`\`', 
    separator: '_____',
    nl: '\n',
}
exports.pipePubgPrices = function(steamMarketObjs) {
    const len = steamMarketObjs.length
    return steamMarketObjs.reduce((acc, curr, i) => {
        const pretty = `${curr.name}${markup.nl.repeat(2)}` 
        + `Precio mas bajo: ${curr.lowest_price}${markup.nl}`
        + `Cantidad: ${curr.volume}${markup.nl}`
        + `Precio promedio: ${curr.median_price}${markup.nl}`
        + `${i < len-1 ? markup.separator : markup.end}${markup.nl.repeat(2)}`;
        return acc + pretty
    }, markup.start)
}

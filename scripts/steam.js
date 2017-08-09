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
exports.pipePubgPrices = function(steamMarketObjs) {
    return steamMarketObjs.reduce((acc, curr) => {
        const pretty = `${curr.name}\n\n` 
        + `Precio mas bajo: ${curr.lowest_price}\n`
        + `Cantidad: ${curr.volume}\n`
        + `Precio promedio: ${curr.median_price}\n`
        + '____________________________\n\n';
        return acc + pretty
    }, '')
}

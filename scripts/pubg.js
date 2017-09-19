const request = require('request-promise');

const config = {
    //apiKey: process.env.PUBG_RANK_TOKEN, 
    apiKey: '07c622b0-5024-417b-9a30-8b7ac3b0c4b6', //PubgTracker User: bigote-bot Pass: bigotebot
    search: {
        byPlayer: 'https://pubgtracker.com/api/profile/pc/{0}', // 0 means playerName
        bySteamName: 'https://pubgtracker.com/api/search?steamId={0}' // 0 means Steam ID (need to be insert on qs of request-promise)
    }
};

const header = {
    'TRN-Api-Key': config.apiKey
};

exports.getRankByPlayerName = function(playerName) {
    request({
        uri: config.search.byPlayer.replace('{0}', playerName),
        json: true,
        headers: header
    }).then(res => exports.showBeautifulRank(res))
    .catch(err => console.log("getRankByPlayerName Error: " + err));
};

exports.getRankBySteamId = function(steamId) {

};


exports.showBeautifulRank = function (response) {
    console.log(JSON.stringify(response));
};
const request = require('request-promise');
const Profile = require('../models/Profile');
const pubgConstants = require('../models/constants');

const config = {
    apiKey: process.env.PUBG_RANK_TOKEN,
    search: {
        byPlayer: 'https://pubgtracker.com/api/profile/pc/{0}', // 0 means playerName
        bySteamName: 'https://pubgtracker.com/api/search?steamId={0}' // 0 means Steam ID (need to be insert on qs of request-promise)
    }
};

const header = {
    'TRN-Api-Key': config.apiKey
};

exports.getRankByPlayerName = function(playerName, server, mode, client) {
    request({
        uri: config.search.byPlayer.replace('{0}', playerName),
        json: true,
        headers: header
    }).then(res => exports.showBeautifulRank(res, server, mode, client))
    .catch(err => client.channel.send(err));
};

exports.getRankBySteamId = function(steamId) {

};


exports.showBeautifulRank = function (response, server, mode, client) {
    try {
        const profile = new Profile(response);        
        profile.getStats({
            region: server ? pubgConstants.REGION[server.toUpperCase()] : pubgConstants.REGION.SA,
            match: mode ? pubgConstants.MATCH[mode.toUpperCase()] : pubgConstants.MATCH.SOLO
        });
    
        client.channel.send(profile.toString());
    }
    catch (e) {
        client.channel.send(e.message);
    }
};


exports.getHelp = function() {
    return `
    Usage: /pubgRank PlayerName <Server> <MATCH TYPE>
    
    Words in <> are optional.
    
    Possible MATCH types: ` + exports.printList(pubgConstants.MATCH)
    
    +

    `

    Possible Server types:` + exports.printList(pubgConstants.REGION);
};

exports.printList = function(list) {
    let result = ' ';

    for (prop in list) {
        result += prop + `
        `
    }

    return result;
};
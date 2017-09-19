const { MATCH, SEASON, REGION, Fields } = require('./constants');
const { StatsNotFound } = require('./errors');

function formatProperty(prop) {
    const str = String(prop).replace(/\s/g, '');
    return `${str.charAt(0).toLowerCase()}${str.slice(1)}`;
};

function findStat(stats, field) {
    let result = stats.find((obj) => (
        obj.field === field
    ));

    return result;
};

class Profile {
    constructor(content) {
        this.content = content;
        this.currentSeason = content.defaultSeason;
        this.currentSeasonLabel = content.seasonDisplay;
        this.lastUpdated = content.LastUpdated;
        this.defaultRegion = content.selectedRegion;
        this.defaultSeason = content.defaultSeason;
        this.playerName = content.PlayerName;
        this.avatar = content.Avatar
        this.stats = content.Stats;
        this.matchHistory = content.MatchHistory;
        this.selectedMatch = "";
        this.selectedRegion = "";

        if (!this.stats) {
            throw new StatsNotFound();
        }
    };

    toString() {
        const selectedStats = this.stats.find((stat) => (
            stat.Region === this.selectedRegion
            && stat.Season === this.defaultSeason
            && stat.Match === this.selectedMatch
        )).Stats;

        let statProperties = "";
        
        for (var x = 0; x < selectedStats.length; x++) {
            let isVisible = Fields.filter(fil => (fil.visible && fil.field === selectedStats[x].field));

            if (isVisible && isVisible.length > 0) {
                statProperties +=  `\n${selectedStats[x].label}: ${selectedStats[x].displayValue}`;
            }
        }

        return '\`\`\`py\nServer:' + this.selectedRegion +
            '\nSeason: ' + this.defaultSeason +
            '\nMatch Mode: ' + this.selectedMatch +
            '\n\n' + this.playerName + ' Stats ->\n'
            + statProperties + '\`\`\`';
    };

    getStats(options = {}, tiny) {
        const region = options.region;
        const season = this.defaultSeason;
        const match = options.match;

        const selectedStats = this.stats.find((stat) => (
            stat.Region === region
            && stat.Season === season
            && stat.Match === match
        ));

        if (!selectedStats) {
            throw new StatsNotFound();
        }

        this.selectedMatch = options.match;
        this.selectedRegion = options.region;
        
        let data = {};

        if (!tiny) {
            data.region = region;
            data.defaultRegion = this.defaultRegion;
            data.season = season;
            data.defaultSeason = this.defaultSeason;
            data.match = match;
            data.lastUpdated = this.lastUpdated;
            data.playerName = this.playerName;
            data.avatar = this.avatar
        }

        const rankData = {};

        data = selectedStats.Stats.reduce((curr, entry) => {
            const stats = curr;
            const value = entry.ValueInt || entry.ValueDec || entry.value;

            const category = formatProperty(entry.category);
            const field = formatProperty(entry.field);

            if (!curr[category]) {
                stats[category] = {};
            }

            stats[category][field] = value;

            if (entry.rank) {
                rankData[field] = entry.rank;
            }

            return stats;
        }, data);

        data.rankData = rankData;

        return data;
    };

    getMatchHistory() {
        const data = {};

        data.total = this.matchHistory.length;
        data.matchHistory = this.matchHistory.map((entry) =>
            Object.keys(entry).reduce((acc, curr) =>
                Object.assign({}, acc, { [formatProperty(curr)]: entry[curr] })
                , {}));

        return data;
    }
};

module.exports = Profile;
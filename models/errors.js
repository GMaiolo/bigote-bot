class EmptyApiKey extends Error {
    constructor(msg) {
        super(msg || 'No Api Key specified when create new PubgApi');
        this.name = this.constructor.name;
    }
}

class ProfileNotFound extends Error {
    constructor(msg) {
        super(msg || 'Profile Not Found');
        this.name = this.constructor.name;
    }
}

class StatsNotFound extends Error {
    constructor() {
        super('Stats not found');
        this.name = this.constructor.name;
    }
}

module.exports = {
    EmptyApiKey,
    ProfileNotFound,
    StatsNotFound,
};
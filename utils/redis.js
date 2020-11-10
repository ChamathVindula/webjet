const redis = require('redis');
const redisConnect = require('connect-redis');

/**
 * @description returns a new RedisStore when supplied with Session
 * @param {*} expressSession
 */
module.exports = (expressSession) => {
    let redisClient = redis.createClient();
    let RedisStore = redisConnect(expressSession);
    return new RedisStore({ client: redisClient });
}

module.exports.createRedisClient = () => {
    return redis.createClient();
}
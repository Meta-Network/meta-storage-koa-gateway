const jsonwebtoken = require('jsonwebtoken');

const config = require('../config').value;
const logger = require('../logger');

const parseAuthHeader = (hdrValue) => {
  if (typeof hdrValue !== 'string') {
    return null;
  }
  const matches = hdrValue.match(/(\S+)\s+(\S+)/);
  return matches && { scheme: matches[1], value: matches[2] };
};
const jwtFromRequestMethods = {
  cookie(ctx) {
    return ctx.cookies.get(config.jwt.accessTokenName);
  },
  authHeaderAsBearerToken(ctx) {
    const authHeader = ctx.get('Authorization');
    logger.debug(`authHeader: ${authHeader}`);
    if (!authHeader) {
      return undefined;
    }
    const authParams = parseAuthHeader(authHeader);
    if (authParams && authParams.scheme.toLowerCase() === 'bearer') {
      return authParams.value;
    }
    return undefined;
  },
};

module.exports = async (ctx, next) => {
  if (config.jwt.enabled) {
    try {
      const accessToken = jwtFromRequestMethods[config.jwt.fromRequest](ctx);
      logger.debug(`accessToken: ${accessToken}`);

      if (!accessToken) {
        ctx.throw(401);
      }
      const result = jsonwebtoken.verify(accessToken, config.jwt.publicKey, {
        ignoreExpiration: false,
        algorithms: ['RS256', 'RS384'],
      });
      logger.debug(`jwt verify result: ${result}`);
      if (!(result && result.sub && result.purpose === 'access_token')) {
        ctx.throw(401, 'invalid jwt purpose');
      }
      ctx.user = {
        id: result.sub,
        username: result.username,
        instance: result.iss,
      };
      logger.debug('ctx.user', ctx.user);
    } catch (err) {
      logger.error(err);
      ctx.throw(401);
    }
  }
  await next();
};

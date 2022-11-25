import * as Joi from 'joi';

export const validate = Joi.object({
  PORT: Joi.number().default(4000),

  JWT_SECRET: Joi.string(),
  JWT_ACCESS_EXPIRED: Joi.string(),
  JWT_REFRESH_EXPIRED: Joi.string(),
});

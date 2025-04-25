import * as Joi from 'joi';

export const configSchema = Joi.object({
  MONGO_URI: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(8).required(),
  PORT: Joi.number().default(3000),
});

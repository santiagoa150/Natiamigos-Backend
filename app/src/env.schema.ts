import * as Joi from 'joi';

/**
 * Schema for validating environment variables in the Gateway application.
 */
export const EnvSchema = Joi.object({
    APP_PORT: Joi.number().port(),
    APP_GLOBAL_PREFIX: Joi.string(),
    SWAGGER_TITLE: Joi.string(),
    SWAGGER_PATH: Joi.string(),
    MONGO_URI: Joi.string().uri(),
    CRYPTO_PEPPER: Joi.string().min(32),
    API_KEY: Joi.string().min(32),
    JWT_ACCESS_TOKEN_SECRET: Joi.string().min(32),
    JWT_REFRESH_TOKEN_SECRET: Joi.string().min(32),
    JWT_ACCESS_TOKEN_EXPIRATION: Joi.string(),
    JWT_REFRESH_TOKEN_EXPIRATION: Joi.string(),
})
    .options({ presence: 'required' })
    .required();

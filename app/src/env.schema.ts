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
})
    .options({ presence: 'required' })
    .required();

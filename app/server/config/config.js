const Joi = require('joi');

require('dotenv').config();

const envVarsSchema = Joi.object({
        NODE_ENV: Joi.string()
            .allow(Config.server.nodeEnv.development,
                Config.server.nodeEnv.production,
                Config.server.nodeEnv.test,
                Config.server.nodeEnv.provision)
            .default(Config.server.nodeEnv.development),
        SERVER_PORT: Joi.number()
            .default(4040),
        JWT_SECRET: Joi.string().required()
            .description('JWT Secret required to sign'),
        MONGO_URI: Joi.string().required()
            .description('Mongo DB url'),
    })
    .unknown()
    .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    jwtSecret: envVars.JWT_SECRET,
    mongoURI: envVars.MONGO_URI
};

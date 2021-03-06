module.exports = {
    server: {
        nodeEnv: {
            development: 'development',
            production: 'production',
            test: 'test',
            provision: 'provision'
        },
        limits: {
            json: '500mb',
            urlEncoded: '500mb'
        },
        passport: {
            local: {
                usernameField: 'email',
                errorMessage: 'Your login details could not be verified. Please try again.'
            }
        },
        headers: {
            contentSecutityPolicy: "default -src 'self' data: blob: https: //*.googleapis.com https://*.gstatic.com https://*.tomtom.com 'unsafe-inline';"
        }
    }
}

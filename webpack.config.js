const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: "node",
    entry: './server/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/server'),
        filename: 'index.js'
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    },
    externals: [nodeExternals()],
};

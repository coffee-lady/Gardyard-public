const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const uri = require('./config').mongoURI;
const Constants = require('../../constants')

const ProcessConst = Constants.process

const client = new MongoClient(uri, {
    useUnifiedTopology: true
});

client.connect(err => {
    if (err) {
        console.error(err);
        client.close();
    }
});

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .catch(err => console.error(err));

process.once(ProcessConst.SIGUSR2, () => {
    process.kill(process.pid, ProcessConst.SIGUSR2)
});

process.on(ProcessConst.SIGINT, () => {
    process.exit(0)
});

process.on(ProcessConst.SIGTERM, () => {
    process.exit(0);
});

require('../models')

const JSONStreamStringify = require('json-stream-stringify');

const Models = require('../models');
const Contacts = Models.Contacts

function handleError(err, res) {
    res.status(400).json({
        message: err.message
    });
    console.error(err);
}

module.exports.create = async function(req, res) {
    const doc = new Contacts(req.body);
    doc.save()
        .then(() => {
            res.status(201).end();
        })
        .catch((err) => { handleError(err, res); return; });
};

module.exports.update = async function(req, res) {
    delete req.body._id;
    Contacts.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(() => {
            res.status(201).end();
        })
        .catch((err) => { handleError(err, res); return; });
};

module.exports.delete = function(req, res) {
    Contacts.findByIdAndDelete(req.params.id, function(err) {
        if (err) { return handleError(err, res); }
        res.status(201).end();
    });
};

module.exports.get = async function(req, res) {
    const doc = await Contacts.findById(req.params.id)
    doc.toObject();
    res.status(200).json(doc);
};

module.exports.getAll = async function(req, res) {
    const stream = new JSONStreamStringify(await Contacts.find());
    res.type('json');
    stream.pipe(res);
    stream.once('error', () => console.log('Error'));
    stream.on('end', function() {
        res.status(200).end();
    });
};

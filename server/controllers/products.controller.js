const { Binary } = require("mongodb")
const Plant = require("./../models/plant.model");

function handleError(err, res) {
    res.status(400).json({
        message: err.message
    });
    console.error(err);
}

module.exports.create = async function(req, res) {
    let data = Object.assign(req.body);
    const plantDoc = new Plant(data);
    plantDoc.save()
        .then(() => {
            res.status(201).end();
        })
        .catch((err) => { handleError(err, res); return; });
};

module.exports.update = async function(req, res) {
    delete req.body.id;

    const plantDoc = Plant.findOneAndUpdate(req.params.id, req.body);
    await (plantDoc.save());

    console.log('update ' + req.params.id);

    res.status(201).end();
};

module.exports.delete = function(req, res) {
    Plant.findByIdAndDelete(req.params.id, function(err) {
        if (err) { return handleError(err, res); }

        console.log('delete ' + req.params.id);

        res.status(201).end();
    });
};

module.exports.get = async function(req, res) {
    const doc = await Plant.findOne(req.params.id);
    doc.toObject();

    console.log('get ' + req.params.id + '\n');
    console.log(doc);

    res.status(200).json(doc);
};

module.exports.getAll = async function(req, res) {
    let docs = await Plant.find({});
    for (let doc of docs) {
        doc.toObject();
    }
    // console.log('get all\n');
    // console.log(docs);

    res.status(200).json(docs);
};
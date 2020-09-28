const Plant = require("./../models/plant.model");

function handleError(err, res) {
    res.json({
        message: err.message
    });
    return console.error(err);
}

module.exports.create = async function(req, res) {
    const plantDoc = new Plant(req.body);
    await plantDoc.save().catch((err) => { return handleError(err, res) });
    return res.status(201);
};

module.exports.update = async function(req, res) {
    delete req.body.id;

    const plantDoc = Plant.findOneAndUpdate(req.params.id, req.body);
    await (plantDoc.save());

    console.log('update ' + req.params.id);

    return res.status(201);
};

module.exports.delete = function(req, res) {
    Plant.findByIdAndDelete(req.params.id, function(err) {
        if (err) { return handleError(err, res); }

        console.log('delete ' + req.params.id);

        return res.status(201);
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

    console.log('get all\n');
    console.log(docs);

    res.status(200).json(docs);
};

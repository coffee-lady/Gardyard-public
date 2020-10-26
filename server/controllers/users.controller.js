const User = require('../models/index.model');

function handleError(err, res) {
    res.json({
        message: err.message
    });
    return console.error(err);
}

module.exports.exists = function(req, res) {
    const searchStr = req.body.searchString;
    User
        .findOne({
            email: searchStr
        })
        .exec((err, user) => {
            if (err) return handleError(err, res);

            delete user.hashedPassword;
            res.status(200).json(user);
        });
};

module.exports.update = async function(req, res) {
    delete req.body._id;
    User.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(() => {
            res.status(201).end();
        })
        .catch((err) => { handleError(err, res); return; });
};

module.exports.get = function(req, res) {
    User
        .findById(req.params.id)
        .exec((err, user) => {
            if (err) return handleError(err, res);

            delete user.hashedPassword;
            res.status(200).json(user);
        });
};

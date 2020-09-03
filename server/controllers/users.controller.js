const User = require('../models/index.model');

function handleError(err, res) {
    res.json({
        message: err.message
    });
    return console.error(err);
}

module.exports.userExists = function(req, res) {
    const searchStr = req.body.searchString;

    User
        .findOne({
            email: searchStr
        })
        .exec((err, user) => {
            if (err) return handleError(err, res);

            res.status(200).json(user);
        });
};

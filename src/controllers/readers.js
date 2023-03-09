const { Reader } = require('../models');

exports.create = async (req, res) => {
    try {
        const { name, email } = req.body;
        const reader = await Reader.create({ name, email });
        res.status(201).json(reader);
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
};


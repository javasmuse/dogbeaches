const Beach = require('../models/Beach');
// @desc Get all beaches
// @route GET /api/v1/beaches
// @access Public or authentication

exports.getBeaches = async (req, res, next) => {
    try {
        const beaches = await Beach.find();

        return res.status(200).json({
            success: true,
            count: beaches.length,
            data: beaches
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'server error'
        });

    }
};

// Create beach POST
exports.addBeach = async (req, res, next) => {
    try {
        const beach = await Beach.create(req.body);

        return res.status(201).json({
            success: true,
            data: beach
        });
    } catch (err) {
        console.error(err);

        if (err.code === 11000) {
            return res.status(400).json({
                error: 'This beach already exists'
            });

        }
        res.status(500).json({
            error: 'server error'
        });

    }
};
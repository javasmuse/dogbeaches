const express = require('express');
const {
    getBeaches,
    addBeach
} = require('../controllers/beaches');

const router = express.Router();

router.route('/').get(getBeaches).post(addBeach);

module.exports = router;
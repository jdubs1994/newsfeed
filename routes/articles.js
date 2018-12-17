const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('articles/index');
});

router.get('/add', (req, res) => {
    res.render('articles/add');
});

module.exports = router;
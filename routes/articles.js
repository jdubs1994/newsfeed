const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', (req, res) => {
    res.render('articles/index');
});

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('articles/add');
});

module.exports = router;
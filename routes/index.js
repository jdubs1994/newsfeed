const express = require('express');
const router = express.Router();
const {ensureGuest} = require('../helpers/auth');


router.get('/', ensureGuest, (req, res) => {
    res.render('index/welcome');
  });

router.get('/about', (req, res) => {
    res.render('index/about');
  });
  
router.get('/', (req, res) => {
    res.send('It Works!');
  });
  

module.exports = router;
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index/welcome');
  });

router.get('/about', (req, res) => {
    res.render('index/about');
  });
  
router.get('/', (req, res) => {
    res.send('It Works!');
  });
  

module.exports = router;
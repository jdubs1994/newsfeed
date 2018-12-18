const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('articles');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', (req, res) => {
    res.render('articles/index');
});

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('articles/add');
});

router.post('/', (req,res) => {
    const newArticle = {
        title: req.body.title,
        body: req.body.body,
        user: req.user.id
    }

    new Article(newArticle)
        .save()
        .then(article => {
            res.redirect(`/articles/show/${article.id}`)
        })
})

module.exports = router;
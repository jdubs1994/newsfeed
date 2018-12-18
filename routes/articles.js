const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('articles');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', (req, res) => {
    Article.find()
        .populate('user')
        .then(articles => {
            res.render('articles/index', {
                articles: articles
            });
        })
});

router.get('/show/:id', (req,res) => {
    Article.findOne({
        _id: req.params.id
    })
        .populate('user')
        .then(article => {
            res.render('articles/show', {
                article: article
            });
        })
})

router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('articles/add');
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Article.findOne({
        _id: req.params.id
    })
        .then(article => {
            res.render('articles/edit', {
                article: article
            });
        })
});

router.put('/:id', (req,res) => {
    Article.findOne({
        _id: req.params.id
    })
        .then(article => {
            article.title = req.body.title;
            article.body = req.body.body;
            article.edited = true

            article.save()
                .then(article => {
                    res.redirect('/')
                })
        })
})

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
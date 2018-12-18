const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('articles');
const User = mongoose.model('users');
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', (req, res) => {
    Article.find()
        .populate('user')
        .sort({date: 'desc'})
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
        .populate('comments.commentUser')
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
            if(article.user != req.user.id) {
                res.redirect('/articles');
            }else {
                res.render('articles/edit', {
                    article: article
                });
            }
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

router.post('/comment/:id', (req,res) => {
    Article.findOne({
        _id: req.params.id
    })
    .then(article => {
        const newComment = {
            commentBody: req.body.commentBody,
            commentUser: req.user && req.user.id || '5c19172cc29dfa6566c5ebc1'
        }
        article.comments.unshift(newComment);
        article.save()
            .then(article => {
                res.redirect(`/articles/show/${article.id}`)
            })
    })
})

router.post('/like/:id', (req,res) => {
    Article.findOne({
        _id: req.params.id
    })
    .then(article => {
        article.articleLikes += 1
        article.save()
            .then(article => {
                res.redirect(`/articles/show/${article.id}`)
            })
    })
})

router.post('/comment/like/:id', (req,res) => {
    Article.findOne({
        'comments._id': req.params.id
    })
    .then(article => {
         article.comments.map((value) => {
             if(value._id == req.params.id) {
                value.commentLikes += 1

                article.save()
                    .then(updatedArticle => {
                        res.redirect(`/articles/show/${updatedArticle.id}`)
                    })
             }
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

function isUserNullOrUndefined(user) {
    
}

module.exports = router;
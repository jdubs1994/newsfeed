const UserModel = require('../../models/User');
const ArticleModel = require('../../models/Article');
const faker = require('faker');

exports.createUser = createUser = (callback) => {    
    UserModel.create({
        googleID: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        image: faker.image.imageUrl()
    }, (err, user) => {
        if (err) {
            callback(err, null);
        } else {        
            callback(null, user);  
        }      
    })
}

/*
exports.createArticle = createArticle = (callback) => {    
    UserModel.create({
        googleID: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        image: faker.image.imageUrl()
    }, (err, user) => {
        if (err) {
            callback(err, null);
        } else {        
            callback(null, user);  
        }      
    })
}
*/

exports.createUserWithArticle = createUserWithArticle = (callback) => {
    createUser((err, user) => {
        if (err) {
            callback(err, null);
        } else {
            ArticleModel.create({
                title: faker.name.title(),
                body: faker.lorem.text(),
                userId: user._id
            }, (err, article) => {
                user.articles = [article]
                if (err) {
                    callback(err, null);
                } else {        
                    callback(null, user);  
                }      
            });
        }
    });
}

exports.createUserWithArticleAndComment = createUserWithArticleAndComment = (callback) => {
    createUser((err, user) => {
        if (err) {
            callback(err, null);
        } else {
            ArticleModel.create({
                title: faker.name.title(),
                body: faker.lorem.text(),
                comments: [{
                    commentBody: faker.lorem.text()
                }],
                userId: user._id
            }, (err, article) => {
                if (err) {
                    callback(err, null);
                } else {
                    user.articles = [article]
                    callback(null, user);  
                }      
            });
        }
    });
}
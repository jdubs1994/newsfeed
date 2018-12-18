module.exports = {
  development: {
    mongoURI:'mongodb://dev:password1@ds263837.mlab.com:63837/newsfeed-dev',
    googleClientID:'109369990946-vkfg5hm9gm4f117d751hiprkkundlq09.apps.googleusercontent.com',
    googleClientSecret:'b5x7nqdnbtiJMH5ZNk6lztya'
  },
  test: {
    mongoURI:'mongodb://james:password1@ds237574.mlab.com:37574/newsfeed',
    googleClientID:'109369990946-vkfg5hm9gm4f117d751hiprkkundlq09.apps.googleusercontent.com',
    googleClientSecret:'b5x7nqdnbtiJMH5ZNk6lztya'
  },
  production: {
    mongoURI:'mongodb://james:password1@ds237574.mlab.com:37574/newsfeed',
    googleClientID:'109369990946-vkfg5hm9gm4f117d751hiprkkundlq09.apps.googleusercontent.com',
    googleClientSecret:'b5x7nqdnbtiJMH5ZNk6lztya'
  }
}
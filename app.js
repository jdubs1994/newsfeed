const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

require('./models/User');
require('./models/Article');

require('./config/passport')(passport);

const auth = require('./routes/auth');
const index = require('./routes/index');
const articles = require('./routes/articles');

const keys = require('./config/keys');

const {
  truncate,
  stripTags,
  formatDate,
  editIcon,
} = require('./helpers/hbs');

mongoose.Promise = Promise;

const env = process.env.NODE_ENV;

mongoose.connect(keys[env].mongoURI, {
  useMongoClient:true
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({
  helpers: {
    truncate: truncate,
    stripTags: stripTags,
    formatDate: formatDate,
    editIcon: editIcon
  },
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');


app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);
app.use('/articles', articles);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});

module.exports = app;
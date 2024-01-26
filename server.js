const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3004;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'cookie monster',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Set the MIME type middleware for /post/js before serving static files
app.use('/post/js', (req, res, next) => {
  res.type('application/javascript');
  next();
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory for the root path
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from 'public/post' directory for the '/post' path
app.use('/post', express.static(path.join(__dirname, 'public', 'post')));

// Define your routes
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

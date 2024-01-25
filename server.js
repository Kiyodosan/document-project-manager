// server.js
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const multer = require('multer');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const postRoutes = require('./controllers/api/postRoutes');
const { User, Post, Document } = require('./models');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3004;
const userRoutes = require('./controllers/api/userRoutes');
app.use('/users', userRoutes);
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Session configuration
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
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File upload route
app.post('/upload-document', upload.single('file'), async (req, res) => {
  try {
    const uploadedFile = req.file;
    console.log('Uploaded File:', uploadedFile);

    // Store information in the database
    const newDocument = await Document.create({
      filename: uploadedFile.originalname,
      path: uploadedFile.path,
    });

    console.log('Document stored in the database:', newDocument);

    // Redirect to homepage
    res.redirect('/');
  } catch (error) {
    console.error('Error handling file upload:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// Homepage Route
app.get('/login', (req, res) => {
  res.render('login', { pageTitle: 'Login' });
});

app.get('/signup', (req, res) => {
  res.render('signup', { pageTitle: 'Signup' });
});

app.get('/profile', (req, res) => {
  res.render('profile', { pageTitle: 'Profile' });
});

app.get('/', async (req, res) => {
  try {
    // Fetch uploaded documents from the database
    const uploadedDocuments = await Document.findAll();

    console.log('Uploaded Documents:', uploadedDocuments);

    res.render('home', {
      pageTitle: 'Document Project Manager',
      uploadedDocuments,
    });
  } catch (error) {
    console.error('Error handling route:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('/api/posts', postRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Keep this occurrence
app.post('/download-document', (req, res) => {
  const documentPath = req.body.documentPath;
  res.download(path.join(__dirname, documentPath));
});

Document.sync({ force: true }).then(() => {
  console.log('Document model synchronized successfully.');
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

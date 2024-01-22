const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const multer = require('multer');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const routes = require('./controllers');
const sequelize = require('./config/connection');

const helpers = require('./utils/helpers');

const { User, Post, Document } =require('./models')

const app = express();
const PORT = process.env.PORT || 3004;

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

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  helpers: {
    isEmpty: function (value) {
      return value == null || (Array.isArray(value) && value.length === 0);
    },
  }
}));
app.set('views', path.join(__dirname, 'views/layouts'));
app.set('view engine', 'handlebars');


// File upload route
app.post('/upload-document', upload.single('file'), async (req, res) => {
  try {
    const uploadedFile = req.file;
    console.log('Uploaded File:', uploadedFile);

    // Store information in database
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

// Homepage Route
app.get('/', async (req, res) => {
  try {
    // Fetch uploaded documents from database
    const uploadedDocuments = await Document.findAll();

    console.log('Uploaded Documents:', uploadedDocuments);

    res.render('main', {
      pageTitle: 'Document Project Manager',
      uploadedDocuments,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/download-document', (req, res) => {
  const documentPath = req.body.documentPath;
  res.download(path.join(__dirname, documentPath));
});
Document.sync({ force: true}).then(() => {
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

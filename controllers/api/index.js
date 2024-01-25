const express = require('express');
const app = express();
const PORT = process.env.PORT || 3004;

const apiRoutes = require('./api');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const homeRoutes = require('./homeRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define route prefixes
app.use('/api', apiRoutes);
app.use('/api/users', userRoutes);
app.use('/post', postRoutes);
app.use('/', homeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;  // Export the Express app instance

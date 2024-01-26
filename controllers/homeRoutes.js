const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Fetch posts data from the database
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Render the home page with posts data
    res.render('home', { posts, logged_in: req.session.logged_in });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    // Render the post page with post data
    res.render('post', { post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    // Render the profile page with user data
    res.render('profile', { ...user, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  // Render the login page
  res.render('login');
});

router.get('/signup', (req, res) => {
  // Render the signup page
  res.render('signup');
});

module.exports = router;

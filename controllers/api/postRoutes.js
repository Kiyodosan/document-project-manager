const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Fetch a single post by ID with associated comments and user information
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: [
        {
          model: Comment,
          include: User, // Include user information for each comment
        },
        User, // Include user information for the post
      ],
    });

    res.render('post', { post });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('Internal Server Error');
  }
});
console.log('Post:', post);
res.render('post', { post });

// Fetch posts for the logged-in user along with associated comments and user information
router.get('/user', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;

    const userPosts = await Post.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Comment,
          include: User, // Include user information for each comment
        },
        User, // Include user information for each post
      ],
    });

    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

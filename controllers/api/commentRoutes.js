console.log('Executing route handler for /somepath');

const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Update a comment using PATCH
router.patch('/:id', withAuth, async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    // Find the comment by id
    const commentToUpdate = await Comment.findByPk(id);

    if (!commentToUpdate) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    
    if (content) {
      commentToUpdate.content = content;
      await commentToUpdate.save();
    }

    res.json(commentToUpdate);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the comment.' });
  }
});
router.patch('/:id', withAuth, async (req, res) => {
  try {
    const { content } = req.body;

    const updatedComment = await Comment.update(
      { content },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (updatedComment[0] === 0) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }

    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update the comment.' });
  }
});

module.exports = router;
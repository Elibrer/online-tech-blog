const router = require('express').Router();
const { Comment } = require('../../models');


// Get all comments
router.get('/', async (req, res) => {
    try {
      const comments = await Comment.findAll({
        // attributes: { exclude: ['password'] },
      });
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
      
      const comment = await Comment.findByPk(req.params.id, {

      });
  
      if (!comment) {
        res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json(comment);
    } catch (err) {
      res.status(500).json(err);
    }
  });


// Create a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_content: req.body.comment_content,
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    }, 
    {
      individualHooks: true
    });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a comment by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedComment) {
      res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted successfully' });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

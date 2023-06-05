const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      // attributes: { exclude: ['password'] },
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all posts with user and comment data
router.get("/all-data", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["comment_content", "user_id", "post_id", "comment_date"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["comment_content", "user_id", "post_id", "comment_date"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single post by ID
// router.get('/:id', async (req, res) => {
//   try {

//     const post = await Post.findByPk(req.params.id, {});

//     if (!post) {
//       res.status(404).json({ message: 'Post not found' });
//     }
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Create a new post
router.post("/", async (req, res) => {
  try {
    const newPost = await Post.create(
      {
        post_name: req.body.post_name,
        post_content: req.body.post_content,
        user_id: req.session.user_id,
      },
      {
        individualHooks: true,
      }
    );
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update an existing post by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        post_name: req.body.post_name,
        post_content: req.body.post_content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedPost[0]) {
      res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedPost) {
      res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

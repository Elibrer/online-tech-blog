const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const auth = require('../utils/auth');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    
    if (req.session.logged_in === true) {
      logged_in = true;
    } else {
      logged_in = false;
    }

    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['comment_content', 'user_id', 'post_id', 'comment_date'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    console.log(posts[0].comments[0].comment_content)
    res.render('home', {
      posts,
      logged_in: logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', auth, async (req, res) => {
  try {
    if(req.session.logged_in === true) {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
      const user = userData.get({ plain: true });
      res.render('dashboard', {
        user,
        
      });
    } else {
    res.redirect('/login')
    } 
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;

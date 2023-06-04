const router = require('express').Router();
const { User, Post } = require('../../models');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      // attributes: { exclude: ['password'] },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    if ( req.session.logged_in === true) {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Post, attributes: ['post_name'] }],
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  }} catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    }, 
    {
      individualHooks: true
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update an existing user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.update({
      id: req.body.id,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
      {
        where: {
          id: req.params.id,
        },
        individualHooks: true
      }
      );
    if (!updatedUser[0]) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully' });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

  req.session.save(() => {
    req.session.logged_in = true;
    console.log(
      'req.session.cookie',
      req.session.cookie
    );
    res
      .status(200)
      .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

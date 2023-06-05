const { User } = require('../models');

const userData = [
  {
    username: "elibrer",
    email: "eli.brer@gmail.com",
    password: "elibrer123"
  },
  {
    username: "johndoe",
    email: "johndoe@gmail.com",
    password: "johndoe123"
  },
  {
    username: "jimjones92",
    email: "jimmyj@gmail.com",
    password: "jimmyj123"
  },
  {
    username: "Dave909",
    email: "david.king@gmail.com",
    password: "daveking123"
  },
  {
    username: "kevmate",
    email: "kjones@gmail.com",
    password: "kevinj123"
  },
];

const seedUser = async () => {
  for (const user of userData) {
    await User.create(user, {individualHooks: true});
  }
}
module.exports = seedUser;
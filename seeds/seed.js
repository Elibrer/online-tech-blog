const sequelize = require('../config/connection');
const seedComment = require('./commentData')
const seedPost = require('./postData')
const seedUser = require('./userData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  await seedUser();
  console.log('\n----- USERS SEEDED -----\n');

  await seedPost();
  console.log('\n----- POSTS SEEDED -----\n');

  await seedComment();
  console.log('\n----- COMMENTS SEEDED -----\n');

  process.exit(0);
};

seedDatabase();

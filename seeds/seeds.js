const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  let idCount = 1;
  for (const post of postData) {
    await Post.create({
      ...post,
      // user_id: users[Math.floor(Math.random() * users.length)].id,
      user_id: idCount,
    });
    idCount++;
  }

  process.exit(0);
};

seedDatabase();
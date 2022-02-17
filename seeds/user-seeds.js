const { User } = require('../models');

const userData = [
  {
    username: 'charlie123',
    password: 'charlie'
  },
  {
    username: 'mike123',
    password: 'mike'
  },
  {
    username: 'jack123',
    password: 'jack'
  },
  {
    username: 'wesley123',
    password: 'wesley'
  },
  {
    username: 'watson123',
    password: 'watson'
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
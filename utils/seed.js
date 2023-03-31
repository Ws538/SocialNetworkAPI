const connection = require ('../config/connection');
const { User, Thought} = require('../models');
const {reactionData, userData, thoughtData} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});

  
})
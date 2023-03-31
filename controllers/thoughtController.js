const { User, Thought} = require('../models');

module.exports = {
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.error("Error in getThought:", err);
        res.status(500).json({ error: err.message });
      });
  },
};
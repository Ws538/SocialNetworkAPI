const { User, Thought } = require("../models");

module.exports = {
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.error("Error in getThought:", err);
        res.status(500).json({ error: err.message });
      });
  },

  getSingleThought(req, res) {
    Thought.findOne()
      .select("-__V")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that Id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    const { thoughtText, userName, userId } = req.body;
    console.log(`Received data:`, req.body);

    if (!thoughtText || !userName || !userId) {
      return res.status(400).json({
        message:
          "Please provide thoughtText, username, and userId in the request body.",
      });
    }

    Thought.create({ thoughtText, userName: userName })
      .then((newThought) => {
        User.findByIdAndUpdate(
          userId,
          { $push: { thoughts: newThought._id } },
          { new: true }
        )
          .then((updatedUser) => {
            if (!updatedUser) {
              console.error(`User not found with ID: ${userId}`);
              return res.status(404).json({ message: "No user with that ID" });
            }
            res.status(201).json(newThought);
          })
          .catch((err) => {
            console.error("Error in createThought (updating user):", err);
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        console.error("Error in createThought (creating thought):", err);
        res.status(500).json({ error: err.message });
      });
  },

  deleteThought(req, res) {
    const thoughtsId = req.params.thoughtsId
    console.log(thoughtsId)

    Thought.findByIdAndDelete(thoughtsId)
      .then((deletedThought) => {
        if (!deletedThought) {
          return res
            .status(404)
            .json({ message: "no thought found with that Id" });
        }

        User.findOneAndUpdate(
          { thought: thoughtsId },
          { $pull: { thoughts: thoughtsId } },
          { new: true }
        )
          .then((updatedUser) => {
            if (!updatedUser) {
              console.error(`User not found with thought ID: ${thoughtsId}`);
              return res
                .status(404)
                .json({ message: "No user with that thought ID" });
            }

            res.status(200).json({ message: `Thought ${thoughtsId} deleted successfully` });
          })
          .catch((err) => {
            console.error("Error in deleteThought (updating user):", err);
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        console.error("Error in deleteThought (deleting thought):", err);
        res.status(500).json({ error: err.message });
      });
  },

  addReaction(req, res) {
    const { thoughtsId } = req.params;
    const { reactionBody, userName } = req.body;
  
    if (!reactionBody || !userName) {
      return res.status(400).json({ message: "Please provide reactionBody and userName in the request body." });
    }
  
    Thought.findByIdAndUpdate(
      thoughtsId,
      { $push: { reactions: { reactionBody, userName } } },
      { new: true }
    )
      .then(updatedThought => {
        if (!updatedThought) {
          return res.status(404).json({ message: "No thought with that ID" });
        }
        res.json(updatedThought);
      })
      .catch(err => {
        console.error("Error in addReaction:", err);
        res.status(500).json({ error: err.message });
      });
  },

  removeReaction(req, res) {
    const { thoughtsId, reactionId } = req.params;
  
    Thought.findByIdAndUpdate(
      thoughtsId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    )
      .then(updatedThought => {
        if (!updatedThought) {
          return res.status(404).json({ message: "No thought with that ID" });
        }
        res.json(updatedThought);
      })
      .catch(err => {
        console.error("Error in removeReaction:", err);
        res.status(500).json({ error: err.message });
      });
  }
};

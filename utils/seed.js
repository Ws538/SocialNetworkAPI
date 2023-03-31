const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { reactionData, userData, thoughtData } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const createdUsers = await User.insertMany(userData);
    thoughtData.forEach((thought, index) => {
      thought.userId = createdUsers[index]._id;
    });

    const createdThoughts = await Thought.insertMany(thoughtData);
    createdUsers.forEach(async (user, index) => {
      user.thoughts.push(createdThoughts[index]._id);
      await user.save();
    });

    // Add reactions to the thoughts
    createdThoughts.forEach(async (thought, index) => {
      thought.reactions.push(reactionData[index]);
      await thought.save();
    });

    console.log("Users, thoughts, and reactions seeded successfully!");
  } catch (err) {
    console.error("Error while seeding users, thoughts, and reactions:", err);
  }
});

const userData = [
  {
    userName: "JaneDoe",
    email: "jane.doe@example.com",
    thoughts: [],
    friends: [],
  },
  {
    userName: "JohnSmith",
    email: "john.smith@example.com",
    thoughts: [],
    friends: [],
  },
  {
    userName: "AliceBlue",
    email: "alice.blue@example.com",
    thoughts: [],
    friends: [],
  },
  {
    userName: "BobGreen",
    email: "bob.green@example.com",
    thoughts: [],
    friends: [],
  }
];

const thoughtData = [ 
  {
    thoughtText: "Just had a great day at the beach!",
    userName: "JaneDoe",
  },
  {
    thoughtText: "Excited for the weekend!",
    userName: "JohnSmith",
  },
  {
    thoughtText: "Working on a new project, can't wait to share it.",
    userName: "AliceBlue",
  },
  {
    thoughtText: "Reading a fascinating book on AI.",
    userName: "BobGreen",
  },
];

const reactionData = [
  {
    reactionBody: "That's awesome!",
    userName: "BobGreen",
  },
  {
    reactionBody: "Have fun!",
    userName: "AliceBlue",
  },
  {
    reactionBody: "Looking forward to seeing it!",
    userName: "JaneDoe",
  },
  {
    reactionBody: "Sounds interesting!",
    userName: "JohnSmith",
  },
];

module.exports = {reactionData, userData, thoughtData};


const User = require("../models/User");

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    users: async () => {
      try {
        return await User.find();
      } catch (err) {
        throw new Error("Failed to fetch users");
      }
    },
  },
  Mutation: {
    addUser: async (_, { password, email }) => {
      try {
        const newUser = new User({ password, email });
        return await newUser.save();
      } catch (err) {
        throw new Error("Failed to add user");
      }
    },
  },
};

module.exports = resolvers;

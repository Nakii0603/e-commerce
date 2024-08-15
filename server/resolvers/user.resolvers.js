const User = require('../models/user.model');

const userResolvers = {
    Query: {
        getUsers: async () => {
            return await User.find();
        },
    },
    Mutation: {
        createUser: async (_, { email, password }) => {
            const user = new User({ email, password });
            await user.save();
            return user;
        },
    },
};

module.exports = userResolvers;

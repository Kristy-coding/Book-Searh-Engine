// import user model 
const { User } = require('../models');

//import sign token function from auth 
const {signToken } = require('../utils/auth');

const { AuthenticationError } = require('apollo-server-express');

const resolvers = {

    Query: {
        me: async (parent, args, context) =>{

            console.log(context);

            if(context.user) {
                const userData = await User.findOne(
                    { _id: context.user._id})
                    .select('-__v -password')

                return userData;
            }


            throw new AuthenticationError('Not logged in');
        },
        // get all users 
            users: async()=> {
                return User.find()
                .select('-__v -password')
            
        },
        // get a user by username 
        user: async(parent, { username })  => {
            return User.findOne({ username })
            .select('-__v -password')
        }
        
    },
    Mutation: {

        addUser: async(parent, args) => {
            const user = await User.create(args);

            const token = signToken(user);

            return { token, user };
        },

        login: async(parent, {email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user }
        },
        saveBook: async (parent, args, context) =>{
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate (
                    {_id: user._id},
                    {$addToSet: {savedBooks: args }},
                    {new: true, runValidators: true}
                );

                return updatedUser;
            }

            throw new AuthenticationError ('You need to be loggin in!')
        },

       // need to remove book by id in params?? 
        removeBook: async (parent, {bookId}, context)=> {

         const updatedUser = await User. findOneAndUpdate(
            {_id: context.user._id},
            {$pull: {savedBooks: {bookId: bookId}}},
            {new: true}    
        );
        if (!updatedUser) {
            throw new AuthenticationError ('Error removing book!')
        }

        return updatedUser
     }

    }


}

module.exports = resolvers;


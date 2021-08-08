const { AuthenticationError, UserInputError, assertResolveFunctionsPresent } = require('apollo-server-express');
const { Profile, Restaurant, VisitHistory } = require('../models');
const { signToken } = require('../utils/auth');
const ObjectId = require('mongodb').ObjectId;

const resolvers = {
  Query: {
    visits: async (parent, args, context) => {
      //if (context.user) {
      //  const user = Profile.findOne({ _id: context.user._id });
        let arr = []; 
        let checkinHistory = [];
        //find the visit history of the person
        const visitHistories = await VisitHistory.find({user: ObjectId("610f8160b4ff8b77813d6003")}).populate('restaurant');
    
        for(var history of visitHistories) {
            arr.push({
                restaurantId: history.restaurant.id,
                restaurantName: history.restaurant.name,
                maxPoint: history.restaurant.maxPoint,
                offerOne: history.restaurant.offerOne,
                offerTwo: history.restaurant.offerTwo,
                activeTemplate: history.restaurant.activeTemplate,
                visitDate: history.visitDate
            });
          
        }
        console.log(arr);
        return arr;

     // }
      ////throw new AuthenticationError('You need to be logged in!');
    },

    restaurants: async () => {
      return Restaurant.find();
    },

    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);
      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('Incorrect email or password!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    // Add a third argument to the resolver to access data in our `context`
    addVisit: async (parent, { restaurantId }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        const user = await Profile.findOne({ _id:  context.user._id });
        const restaurant = await Restaurant.findOne({ _id: restaurantId});
        const visitDate = Date.now();
        if (!restaurant) {
          throw new UserInputError('Cannot find the restaurant');
        }
        const visit = await VisitHistory.create({user, restaurant, visitDate});
        return visit;
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },

    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, {id}, context) => {
      if (context.user &&  context.user._id === id ) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;

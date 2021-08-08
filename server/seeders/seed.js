const db = require('../config/connection');
const { Profile, Restaurant, VisitHistory } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const restaurantSeeds = require('./restaurantSeeds.json');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    await Profile.create(profileSeeds);

    await Restaurant.deleteMany({});
    await Restaurant.create(restaurantSeeds);

    await VisitHistory.deleteMany({});
    await VisitHistory.create({"name": "hiii"});
    console.log('all done!');
    
    process.exit(0);
  } catch (err) {
    throw err;
  }
});

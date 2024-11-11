const Schedule = require('../models/schedule');

// Seed function that takes time slots and number of players as parameters
async function seedScheduleData(location,sport,timeSlots, numberOfPlayers) {
  const schedules = await Schedule.find({});
  
  // Seed data only if no schedules exist
  if (schedules.length === 0) {

    const slots = timeSlots.map(time => ({
      time: time,
    }));

    await Schedule.create({
      location: location,
      sport: sport,
      slots: slots,
      numPlayers: numberOfPlayers,
    });
  }
}

module.exports = seedScheduleData;

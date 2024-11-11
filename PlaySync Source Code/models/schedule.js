const mongoose = require('mongoose');

// Schema definition
const scheduleSchema = new mongoose.Schema({
  location: { type: String, required: true },
  sport: { type: String, required: true },
  slots: [{
    time: { type: String, required: true },
    players: [{ type: String}]  // Array of players
  },{timestamps: true}],
  numPlayers: { type: Number, required: true },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;

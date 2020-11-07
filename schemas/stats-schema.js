const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const statsSchema = mongoose.Schema({
  guildId: reqString,
  userId: reqString,
  wins: {
    type: Number,
    default: 0,
  },
  loss: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('among-us-stats', statsSchema)
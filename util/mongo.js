const mongoose = require('mongoose')
require('dotenv').config();

const mongoP = process.env.MONGO;

module.exports = async () => {
  mongoose.connect(mongoP, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
}

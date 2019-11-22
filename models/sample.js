const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sampleSchema = new Schema({
  keyword:  String,
  answer: String
})

const SampleModel = mongoose.model('samples', sampleSchema)

module.exports = SampleModel
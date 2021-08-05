const mongoose = require('mongoose')

const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/test')

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: Number,
  },
  hobbies: {
    type: String,
  },
  nameObj: {
    type: Object,
  },
})

module.exports = mongoose.model('Students', studentSchema)

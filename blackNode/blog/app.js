const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

app.use('/public/', express.static(path.join(__dirname, './public')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules')))

app.get('/', (req, res) => {
  res.send('Hello blog')
})

app.listen(3000, () => {
  console.log('runing...')
})

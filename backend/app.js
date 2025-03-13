require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { MONGODB_URI, PORT } = require('./utils/config')
const { info, error } = require('./utils/loggers')
const middleware = require('./utils/middleware')
const noteRouter = require('./controllers/notes')

mongoose.set('strictQuery', false)

const url = MONGODB_URI

mongoose.connect(url)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch(e => {
    error('error connecting to MongoDB:', error.message)
  })

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

app.use('/', noteRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

module.exports = app

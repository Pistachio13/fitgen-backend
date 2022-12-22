require('dotenv').config()
const connectDatabase = require('./database/database')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { PORT } = process.env
const userRoutes = require('./routes/user')
const activityRoutes = require('./routes/activities')
const userInfoRoutes = require('./routes/userInfo')
const checkAuth = require('./middleware/check-auth')
const cookieParser = require('cookie-parser')

const app = express()

connectDatabase()

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors({
  origin: 'https://jsd-fitgen-frontend.vercel.app', 
  credentials: true 
}));

// app.use('/users', userRoutes)
// app.use('/userInfo', checkAuth, userInfoRoutes)
app.use('/activities', activityRoutes)

app.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message
  })
})

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to MongoDB', success: 'yes' })
})

app.listen(PORT, () => {
  console.log('Server is running at http://localhost:%d', PORT)
})
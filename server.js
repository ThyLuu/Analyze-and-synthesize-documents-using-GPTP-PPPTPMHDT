const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const colors = require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/errorMiddleware')
const authRoutes = require('./routes/authRoutes')

dotenv.config()

const app = express()

app.use(cors());

//middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(errorHandler)

const PORT = process.env.PORT || 8080

//API routes
app.use('/api/v1/auth', authRoutes)
// app.use('/api/v1/openai', require("./routes/openaiRoutes"))

app.listen(8080, () => {
    console.log(`server running in ${process.env.DEV_MODE} on ${PORT}`)
})

//MongoDB connect 
connectDB()
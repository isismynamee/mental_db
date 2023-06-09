// import dotenv and call config function to load environment
require('dotenv').config()
const express = require('express')

const cors = require('cors')


// Get routes to the variabel
const router = require('./src/routes')

const app = express()

const port = 5000

app.use(express.json())
app.use(cors())

// Add endpoint grouping and router
app.use(process.env.PATH_ROUTE, router)

// change app to server
app.listen(port, () => console.log(`Listening on port ${port}!`))
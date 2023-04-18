const express = require('express')
const { regist, login } = require('../controller/user')
const { getProfiles, updateProfile } = require('../controller/profile')
const route = express.Router()

route.post("/regist", regist)
route.post('/login', login)

route.get('/profile', getProfiles)
route.patch('/update-profile/:profile', updateProfile)

module.exports = route
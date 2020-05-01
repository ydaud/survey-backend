const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/users')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { body } = request

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    username: body.username,
    name: body.name,
    passwordHash,
    birthDate: body.birthDate,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = userRouter

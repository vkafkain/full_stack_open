const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body
  
  if(!username || !password) {
    return response.status(400).json({
      error: 'username and password are require'
    })
  }
  if(username.length < 3 || username.length < 3){
    return response.status(400).json({
      error: 'the username and password must be at least 3 caracters long'
    })
  }

  const userFind = await User.findOne( { username })
  if(userFind) {
    return response.status(400).json( {
      error: '`username` to be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(200).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  if(users){
    response.status(200).json(users)
  } else {
    response.status(404).end()
  }
})

module.exports = usersRouter
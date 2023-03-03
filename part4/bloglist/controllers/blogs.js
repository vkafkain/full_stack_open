const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  if(blogs){
    response.json(blogs)
  } else {
    response.status(404).end()
  }
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, config.SECRET)
  if(!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id)

  if(!body.title || !body.url){
    return response.status(400).end()
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  }).populated('user', {username: 1, name: 1})
 
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await blog.save()

  response.status(200).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  const decodedToken = jwt.verify(request.token, config.SECRET)
  if(!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }
  
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(blog)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'unhautorized operation' })
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true} )
  
  if(updatedBlog) {
    response.status(200).json(updatedBlog)
  } else {
    response.status(400).end()
  }

})

module.exports = blogsRouter
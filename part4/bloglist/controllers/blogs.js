const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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
  
  const user = await User.findOne({})

  if(!body.title || !body.url){
    return response.status(400).end()
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })
 
  const savedBlog = await blog.save()
  response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Messi world champion',
    author: 'Maradona',
    url: 'www.nike.com',
    likes: 304,
  },
  {
    title: 'Hamilton win',
    author: 'Alonso',
    url: 'www.sport.com',
    likes: 87,
  }
]

const nonExistingId = async () => {
  const blog = new Blog( { 
    title: 'Barça out of Euroligue', 
    author: 'Bodiroga',
    url: 'www.euroleague.net', 
    likes: 22})
  await blog.save()
  await blog.remove()

  return blog._id.toString()
} 

const blogInDb = async () => {
  const blog = await Blog.find({})
  return blog.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogInDb
}
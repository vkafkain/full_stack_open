const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'Messi world champion'
  )
})

test('expect _id atributte is called id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  blogs.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('new blog can be added', async () => {
  const newBlog = {
    title: 'Federer retired',
    author: 'Nadal',
    url: 'www.usopen.com',
    likes: 233
  }
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).toContain(
    'Federer retired'
  )
})

afterAll(() => {
  mongoose.connection.close()
})
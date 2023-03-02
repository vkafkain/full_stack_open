const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  for( let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
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
    likes: 300,
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

test('if likes missing default value = 0', async () => {
  const newBlog = {
    title: 'Federer retired',
    author: 'Nadal',
    url: 'www.usopen.com',
  }

  await api 
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const newAdded = response.body.find(blog => blog.title === 'Federer retired')

  expect(newAdded.likes).toBe(0)
})

test('if title or url missing throw error 400', async () => {
  const noTitle = {
    author: 'Nadal',
    url: 'www.usopen.com',
    likes: '32'
  }
  const noUrl = {
    title: 'Federer retired',
    author: 'Nadal',
    likes: '32'
  }
  await api 
    .post('/api/blogs')
    .send(noTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(noUrl)
    .expect(400)
})

test('blog delete correctly', async () => {

})

afterAll(() => {
  mongoose.connection.close()
})
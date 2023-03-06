const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

let authHeader

describe('blogs api', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  
    const user = helper.initialUsers[0]
    await api
      .post('/api/users')
      .send(user)

    const response = await api
      .post('/api/login')
      .send(user)
    
    authHeader = `Bearer ${response.body.token}`
  })
  
  describe('when there are blogs saved', () => {
    beforeEach(async () => {
      await Blog.deleteMany({})
      await Blog.insertMany(helper.initialBlogs)
    })

    test('blogs are returned as json', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)

      expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a blog can be edited', async () => {
      const [blogBefore] = await helper.blogInDb()

      const modifiedBlog = {...blogBefore, title: 'Goto considered useful'}

      await api
        .put(`/api/blogs/${blogBefore.id}`)
        .send(modifiedBlog)
        .expect(200)
    
      const blogs = await helper.blogInDb()

      const titles = blogs.map(r => r.title)
    
      expect(titles).toContain(
        modifiedBlog.title
      )
    })
    
    
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
        .set('Authorization', authHeader)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      const blogsAtEnd = await helper.blogInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)
    
      const titles = blogsAtEnd.map(r => r.title)
    
      expect(titles).toContain(
        blogsAtEnd.title
      )
    })
    
    test('if likes missing default value = 0', async () => {
      const newBlog = {
        title: 'Federer retired',
        author: 'Nadal',
        url: 'www.usopen.com',
      }
    
      const response = await api 
        .post('/api/blogs')
        .set('Authorization', authHeader)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      expect(response.body.likes).toBe(0)
    })
    
    test('if title or url missing throw error 401', async () => {
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
        .expect(401)
    
      await api
        .post('/api/blogs')
        .send(noUrl)
        .expect(401)
    })
    test('blog delete correctly', async () => {
    
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
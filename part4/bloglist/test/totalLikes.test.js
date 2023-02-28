const listHelper = require('../utils/list_helpers')
const blogPosts = require('./blogPosts')

describe('total likes', () => {
  
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogPosts.listWithOneBlog)
    expect(result).toBe(5)
  })
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(blogPosts.zero)
    expect(result).toBe(0)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogPosts.biggerList)
    expect(result).toBe(36)
  })
})
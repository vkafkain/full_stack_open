const listHelper = require('../utils/list_helpers')
const blogPosts = require('./blogPosts')

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog(blogPosts.zero)
    expect(result).toBe(null)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.favoriteBlog(blogPosts.listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
  test('of a bigger list is finding right most likes', () => {
    const result = listHelper.favoriteBlog(blogPosts.biggerList)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})
/* eslint-disable no-unused-vars */

const dummy = (blogs) => {
  return 1  
}


const totalLikes = (blogs) => {
  let total = 0
  if(blogs.length === 0) {
    return total
  }
  if(blogs.length > 0) {
    return total += blogs.reduce((sum, post) => sum + post.likes, 0)
  }
}


module.exports = {
  dummy,
  totalLikes
}
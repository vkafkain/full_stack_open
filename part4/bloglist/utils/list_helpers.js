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

const favoriteBlog = (blogs) => {
  blogs.reduce( (ant, act) => {
    return (ant.likes > act.likes) ? ant : act
  })

}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
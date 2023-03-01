/* eslint-disable no-unused-vars */

const dummy = (blogs) => {
  return 1  
}


const totalLikes = (blogs) => {
  let total = 0
  if (blogs.length === 0) return total
  return total += blogs.reduce((sum, post) => sum + post.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  
  const mostLikes = blogs.reduce( (ant, act) => {
    return (ant.likes > act.likes) ? ant : act
  })

  return {
    title: mostLikes.title,
    author: mostLikes.author,
    likes: mostLikes.likes,
  }

}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
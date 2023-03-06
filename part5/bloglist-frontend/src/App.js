import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

/*   useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []) */

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      },5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null)
  }

 /*  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
      <h2>log in to application</h2>

      <Notification message={errorMessage}/>

        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
 */
 if(user === null) {
   return (
     <div>
       <h2>log in to application</h2>
 
     <Notification message={errorMessage}/>
 
       <form onSubmit={handleLogin}>
         <div>
           username
             <input
             type="text"
             value={username}
             name="Username"
             onChange={({ target }) => setUsername(target.value)}
           />
         </div>
         <div>
           password
             <input
             type="password"
             value={password}
             name="Password"
             onChange={({ target }) => setPassword(target.value)}
           />
         </div>
         <button type="submit">login</button>
       </form>
 
       {blogs.map(blog =>
         <Blog key={blog.id} blog={blog} />
       )}
     </div>
   )
 }
 return (
  <div>
    <h2>blogs</h2>
    {`${user.username} logged in`}
    <button onClick={handleLogout}>logout</button>

    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

}

export default App
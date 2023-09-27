import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // ilmoituksiin liittyvät tilamuuttujat:
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // autentikointiin liittyvät tilamuuttujat
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // alustus, hae kaikki blogit:
  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    }
    )
  }, [])

  // sovellus tarkistaa, että löytyykö local storagesta tiedot kirjautuneesta käyttäjästä
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON) // muunnos: JSON -> JS objekti
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // kirjautuminen sisään
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)

      // tallennetaan käyttäjätiedot local storageen
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')

      setSuccessMessage(`'${username}' logged in`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  // poista blogi
  const deleteBlog = async(id) => {
    // etsi id:tä vastaava objekti
    const removedBlog = blogs.find(p => p.id === id)
    // varmista pyyntö
    if (window.confirm(`Delete ${removedBlog.title}?`)) {
      // poista objekti serveriltä + rakenteesta
      try {
        await blogService.del(id, removedBlog)
        setBlogs(blogs.filter(b => b.id !== id))
        // tulosta ilmoitus
        setSuccessMessage(`Blog'${removedBlog.title}' was deleted from the bloglist`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
      catch (error) { // virheilmoitus
        console.log(error)
      }
    }
  }

  // tykkäysten lisääminen
  const addLikes = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlogObject = {
      id : blog.id,
      user : blog.user,
      author : blog.author,
      title : blog.title,
      url : blog.url,
      likes : blog.likes + 1
    }
    try {
      await blogService.update(id, updatedBlogObject)
      // blogs.sort((a, b) => b.likes - a.likes)
      // setBlogs(blogs)
      setBlogs(blogs.map(b => b.id !== id ? b : updatedBlogObject))
    } catch (error) {
      console.log(error)
    }
  }

  // uuden blogin luonti
  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(`A new blog '${blogObject.title}' was added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      // Handle any potential errors here
    }
  }

  // kirjautuminen ulos
  const handleLogout =  () => {
    setUser(null)
    setUsername('')
    setPassword('')
  }

  // user === null : pyydetään loggamaan sisään
  if (user === null) {
    return (
      <div>
        <Notification message={successMessage} msgType="success"/>
        <Notification message={errorMessage} msgType="error"/>
        <h2>Log in to application</h2>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  // käsitellään tapaus user!== null:
  return (
    <div>
      <Notification message={successMessage} msgType="success"/>
      <Notification message={errorMessage} msgType="error"/>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>
          logout
        </button>
      </p>

      {blogs.sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id}
            blog={blog}
            addLikes= {() => addLikes(blog.id)}
            deleteBlog= {() => deleteBlog(blog.id)}
            loggedUser= {user}
          />
        )
        )}

      <Togglable buttonLabel="create blog">
        <BlogForm createBlog = {addBlog} />
      </Togglable>
    </div>
  )
}

export default App
// import { useState, useEffect } from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'

import blogService from './services/blogs'
import userService from './services/users'
import MainView from './components/MainView'
import UserView from './components/UserView'
import UserInfo from './components/UserInfo'

import BlogInfo from './components/BlogInfo'
import Notification from './components/Notification'
// import { setNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'
import { setPassword, setUser, setUserName } from './reducers/loggedUserReducer'
// import { setUser } from './reducers/loggedUserReducer'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  // alustus, hae kaikki blogit:
  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      dispatch(setBlogs(blogs))
    })
  }, [dispatch])
  const blogs= useSelector(state => state.blogs)
  //  console.log(JSON.parse(JSON.stringify(blogs)))

  // haetaan kaikki käyttäjät:
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getUsers().then(u =>
      setUsers( u ))}, [])
  // console.log(users)

  // tarkistetaan, että löytyykö local storagesta tiedot kirjautuneesta käyttäjästä
  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if (userJSON) {
      const modUser = JSON.parse(userJSON) // muunnos: JSON -> JS objekti
      dispatch(setUser(modUser))
      blogService.setToken(modUser.token)
    }
  }, [])
  const user= useSelector (state => state.loggedUser).user

  // kirjautuminen ulos
  const handleLogout =  () => {
    dispatch(setUser(null))
    dispatch(setUserName(''))
    dispatch(setPassword(''))
  }

  const padding = {
    padding: 7
  }

  return (
    <div>
      <Router>
        <div>
          {user && <div>
            <div className="greyBG">
              <Link style={padding} to="/">home</Link>
              <Link style={padding} to="/users">users</Link>
              {user.name} logged in
              <button onClick={handleLogout}>logout
              </button>
            </div>
            <div><Notification /></div>
          </div>}
        </div>

        <Routes>
          <Route path="/users/:id" element={<UserInfo users= {users} />} />
          <Route path="/blogs/:id" element={<BlogInfo blogs= {blogs} />} />
          <Route path="/users" element={user ? <UserView users= {users}/> : <Navigate replace to="/" />} />
          <Route path="/" element={<MainView user={user}/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
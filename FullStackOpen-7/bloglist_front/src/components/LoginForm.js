// lomake: kirjautuminen sisään
import { useDispatch, useSelector } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'

import { setPassword, setUser, setUserName } from '../reducers/loggedUserReducer'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  let userData= useSelector (state => state.loggedUser)
  let username= userData.name
  let password= userData.password

  // kirjautuminen sisään
  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log(password)
    // console.log(username)
    try {
      const user = await loginService.login({
        username, password
      })
      blogService.setToken(user.token)
      // console.log(user)

      // tallennetaan käyttäjätiedot local storageen
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch(setNotification([`'${username}' logged in`, 'success']))
      dispatch(setUser(user))
      dispatch(setUserName(''))
      dispatch(setPassword(''))

    } catch (exception) {
      dispatch(setNotification(['wrong username or password', 'error']))
    }
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => dispatch(setUserName(target.value))}
          />
        </div>
        <div>
            password
          <input
            type="password"
            id='password'
            value={password}
            onChange={({ target }) => dispatch(setPassword(target.value))}
          />
        </div>
        <button id="login-button" type="submit">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm
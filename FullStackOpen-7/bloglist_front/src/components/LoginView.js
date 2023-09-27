import Notification from './Notification'
import LoginForm from './LoginForm'

const LoginView = () => {
  return(
    <div>
      <Notification/>
      <h2>Log in to application</h2>
      <LoginForm/>
    </div>
  )
}

export default LoginView
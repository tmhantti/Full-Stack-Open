import BlogList from './BlogList'
import LoginView from './LoginView'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const MainView = ({ user }) => {
  if (user === null) {
    return (
      <LoginView/>
    )
  }
  // käsitellään tapaus user!== null:
  return (
    <div>
      <h2>blog app</h2>
      <div><Togglable buttonLabel="create blog">
        <BlogForm  />
      </Togglable>
      </div>
      <BlogList/>
    </div>
  )
}

export default MainView
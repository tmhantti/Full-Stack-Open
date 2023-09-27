// import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import userService from '../services/users'

const UserView = ({ users } ) => {
  // const userNames = users.map(u => u.name)
  // const userBlogs = users.map(u => u.blogs.length)
  // console.log(users)
  // console.log(userBlogs)

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td>&nbsp;</td>
            <td><b>blogs created</b></td>
          </tr>
          {users.map(user =>
            <tr key= {user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div> )
}

export default UserView
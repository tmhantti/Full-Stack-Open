import { useParams } from 'react-router-dom'

const UserInfo = ( { users } ) => {
  // console.log(users)
  const id = useParams().id
  const user = users.find(u => (u.id) === (id))
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {user.blogs.map(b =>
        <li key={b.id}>
          {b.title}
        </li>
      ) }
    </div>
  )
}
export default UserInfo
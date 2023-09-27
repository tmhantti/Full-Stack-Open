import axios from 'axios'
const baseUrl = 'http://localhost:3000/bloglist/api/users'

const getUsers = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const updateUser = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  const response = await request
  return response.data
}

export default { getUsers, updateUser }
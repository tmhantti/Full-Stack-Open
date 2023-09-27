/* eslint-disable no-undef */
import axios from 'axios'
console.log(process.env.NODE_ENV)

let baseUrl= 'http://localhost:5000/anecdotes'

if (process.env.NODE_ENV === 'production') {
  baseUrl = './anecdotes'
}

console.log(baseUrl)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  const response = await request
  return response.data
}

const del = async (id, delObject) => {
  const response = await axios.delete(`${baseUrl}/${id}`, delObject)
  return response.data
}


export default { getAll, createNew, update, del }
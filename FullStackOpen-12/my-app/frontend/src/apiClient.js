// import 'dotenv/config'
import axios from 'axios'
// require('dotenv').config()

console.log("Axios baseURL:", process.env.REACT_APP_BACKEND_URL);

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

export default apiClient
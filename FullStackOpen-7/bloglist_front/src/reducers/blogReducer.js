import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice= createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like(state,action) {
      const id = action.payload
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }

      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    delBlog(state,action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    }
  }
})

export const { like, appendBlog, setBlogs, delBlog } = blogSlice.actions

export const createBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const updateLike= b => {
  return async dispatch => {
    await blogService.update(b.id, b)
    dispatch(like(b.id))
  }
}

export const deleteBlog= b => {
  return async dispatch => {
    await blogService.del(b.id, b)
    dispatch(delBlog(b.id))
  }
}

export default blogSlice.reducer
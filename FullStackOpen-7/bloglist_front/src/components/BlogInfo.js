import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from '../reducers/notificationReducer'
import { updateLike, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blogs }) => {
  const dispatch = useDispatch()

  const id = useParams().id
  const blog= blogs.find(b => (b.id) === (id))
  const loggedUser= useSelector (state => state.loggedUser).user
  if (!blog) {
    return null
  }
  const blogAdder= blog.user.name

  // poista blogi
  const delBlog = async(removedBlog) => {
    // varmista pyyntö
    if (window.confirm(`Delete ${removedBlog.title}?`)) {
      // poista objekti serveriltä + storesta
      try {
        dispatch(deleteBlog(removedBlog))
        dispatch(setNotification([`Blog'${removedBlog.title}' was deleted from the bloglist`, 'success']))
      }
      catch (error) { // virheilmoitus
        console.log(error)
      }
    }
  }

  // lisää tykkäys:
  const addLikes = async (blog) => {
    const updatedBlogObject = {
      ...blog,
      likes : blog.likes + 1
    }
    try {
      dispatch(updateLike(updatedBlogObject))
    } catch (error) {
      console.log(error)
    }
  }

  // näytä kaikki blogin tiedot:
  return(
    <div key={blog.id}>
      <div>
        <h2>{blog.title} {blog.author} </h2>
      </div>
      <div className="blogDetailedInfo">
        <a href= {blog.url}>{blog.url}</a>
        <p>{blog.likes} likes
          <button onClick= {() => addLikes(blog)}> like </button>
        </p>
        <p>added by {blogAdder} </p>
        {/* näytä poistonappi, vain jos blogi on kirjautuneen käyttäjän lisäämä */}
        { (blogAdder === loggedUser.name) &&
          <button onClick={() => delBlog(blog)}>remove</button> }
      </div>
    </div> )
}

export default Blog

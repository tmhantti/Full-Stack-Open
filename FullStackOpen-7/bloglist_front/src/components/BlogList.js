import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  let blogs= useSelector(state => state.blogs)
  blogs= blogs.slice().sort((a, b) => b.likes - a.likes)
  // console.log(JSON.parse(JSON.stringify(blogs)))

  // CSS-tyyli inlinenä
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div>
      <h2>blogs</h2>
      { blogs
        .map(blog => <div key= {blog.id} style= {blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
        ) }
    </div>
  )
}

export default BlogList
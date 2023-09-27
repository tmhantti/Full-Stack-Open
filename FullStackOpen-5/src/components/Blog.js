// komponentti - näytetään yksittäinen blogi:
import { useState } from 'react'

const Blog = ({ blog, addLikes, deleteBlog, loggedUser }) => {

  // tilamuuttuja: blogin tykkäysten lkm
  const [likes, setLikes] = useState(blog.likes)

  // tilamuuttuja: näytetäänkö ko. blogin kaikki tiedot?
  const [showDetails, setDetails] = useState(false)

  // CSS-tyyli inlinenä
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // label : hide / show
  const label = showDetails ? 'hide' : 'show'

  // tilankäsittelijä blogitiedoille:
  const toggleDetails = () => {
    setDetails(!showDetails)
  }

  // tykkäysten lisääminen:
  const handleLike = () => {
    addLikes()
    setLikes(likes + 1)
  }

  // blogin poisto:
  const handleDel = () => {
    deleteBlog()
  }
  /* return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>{label}</button>
      </div>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {loggedUser.username === blog.user.username && (
            <button onClick={() => handleDel()}>remove</button>
          )}
        </div>
      )}
    </div>
  )
} */
  if (!showDetails) {
    return(
      <div key={blog.id}>
        <div style= {blogStyle} className="blogBasicInfo">
          <b> {blog.title} {blog.author} </b>
          <button onClick={toggleDetails}>{label}</button>
        </div>
      </div> )
  } else {
    // näytä kaikki blogin tiedot:
    return(
      <div key={blog.id}>
        <div style= {blogStyle}>
          <b>{blog.title} {blog.author} </b>
          <button onClick={toggleDetails}>{label}</button>
        </div>
        {/* näytä blogin kaikki tiedot ja lisäksi 'like' -button */}
        <div style= {blogStyle} className="blogDetailedInfo">
          {blog.url}
          <p>likes {likes}
            <button onClick= {() => handleLike()}> like </button>
          </p>
          <p>{blog.user.name} </p>
          {/* näytä poistonappi, vain jos blogi on kirjautuneen käyttäjän lisäämä */}
          { (blog.user.name === loggedUser.name) &&
          <button onClick={() => handleDel()}>remove</button> }
        </div>
      </div> )
  }
}

export default Blog
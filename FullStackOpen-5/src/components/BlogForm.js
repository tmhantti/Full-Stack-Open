import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      url: newUrl,
      author: newAuthor,
    }
    createBlog(blogObject)
    setNewTitle('')
    setNewUrl('')
    setNewAuthor('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog} data-testid="blog-form">
        <div>
          title:
          <input
            id="title"
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            placeholder="insert title here"
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={newUrl}
            onChange={handleUrlChange}
            placeholder="insert url here"
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder="insert author here"
          />
        </div>
        <div>
          <button type="submit" id="submitbutton">create</button>
        </div>
      </form>
    </div>
  )
}
export default BlogForm

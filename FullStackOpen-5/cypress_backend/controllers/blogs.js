const blogsRouter = require('express').Router()
const Blog= require('../models/blog')
const middleware = require('../utils/middleware')

const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => { 
    const blogs = await Blog.
      find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
  })

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  /* mikäli objekti ei sisällä kenttää 'url' tai 'title', 
     vastataan statuskoodilla 400 */ 
  if (blog.title === undefined || blog.url === undefined) 
    response.status(400).end()    

  /* lisätään objektiin kenttä 'likes' ja asetetaan sen arvo nollaksi,
  /  mikäli sitä ei ole annettu */
  if (blog.likes === undefined) 
    blog.likes = 0

  // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  // get user from request object
  const user = request.user

  // const user = await User.findById(decodedToken.id)

  blog.user = user._id
  const savedBlog = await blog.save()
  user.blogs= user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  // tarkistetaan, että käyttäjällä on validi token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  // haetaan poistopyynnön tehnyt käyttäjä
  const userDeleter = request.user
  const userid= userDeleter.id

  // haetaan poistettava blogi
  const blog= await Blog.findById(request.params.id)

  // tarkistetaan, että poistopyynnön ja blogin lisäyksen on tehnyt sama käyttäjä: 
  if (blog.user.toString() === userid.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else {
    return response.status(401).json({ error: 'user is not authorized to remove the blog' })    
  }
  
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.end()
})

module.exports = blogsRouter
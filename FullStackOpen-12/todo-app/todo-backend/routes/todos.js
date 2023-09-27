const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { getAsync, setAsync} = require('../redis/index')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {

  // increase counter: 
  const current_added_todos= await getAsync('added_todos')
  const new_added_todos= Number(current_added_todos) + 1
  await setAsync('added_todos', new_added_todos)
  
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* 
singleRouter.get('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});

/* PUT todo. 
singleRouter.put('/', async (req, res) => {
  res.sendStatus(405); // Implement this
});
*/

// GET a specific todo by ID (Exercise 12.7)
// huom: middleware hoitaa id:n
singleRouter.get('/', (req, res) => {
  res.send(req.todo); 
});

// PUT todo (Exercise 12.7)
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;

  // Update the todo properties if they are provided in the request body
  if (text !== undefined) req.todo.text = text;
  if (done !== undefined) req.todo.done = done;

  try {
    const updatedTodo = await req.todo.save();
    res.send(updatedTodo);
  } catch (error) {
    res.status(500).send({ message: 'Error updating the todo.' });
  }
});


router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;

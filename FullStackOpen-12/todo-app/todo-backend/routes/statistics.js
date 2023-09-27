const express = require('express');
const router = express.Router();
const { getAsync, setAsync } = require('../redis/index')

/* GET index data. */
router.get('/', async (req, res) => {
  // initialize counter  
  if (!(await getAsync('added_todos'))) {
    const initValue = Number(0)
    await setAsync('added_todos', initValue)
  }      
  const curValue = await getAsync('added_todos');
  // Send the result as JSON
  res.json({
    "added_todos": Number(curValue)
  });
});

module.exports = router ;
import axios from 'axios'
import backend from '../services/anecdotes'

// mock DB:
jest.mock('axios')

// ------------------------------------------------------------------------------------------------------
describe('Backend functions', () => {
  describe('getAll', () => {
    it('fetches successfully data from the API', async () => {
      const data = [{
        'content': 'Elämä on laiffii',
        'id': '47145',
        'votes': 0
      }]

      axios.get.mockResolvedValue({ data })

      await expect(backend.getAll()).resolves.toEqual(data)
    })

    it('fetches erroneously data from the API', async () => {
      axios.get.mockRejectedValue(new Error('An error occurred'))
      await expect(backend.getAll()).rejects.toThrow('An error occurred')
    })
  })
  // ------------------------------------------------------------------------------------------------------
  describe('createNew', () => {
    it('successfully creates a new anecdote', async () => {
      const data = {
        'content': 'Lahti on mesta paikka',
        'id': '47146',
        'votes': 0
      }

      axios.post.mockResolvedValue({ data })
      await expect(backend.createNew(data.content)).resolves.toEqual(data)
    })

    it('errors while creating a new anecdote', async () => {
      axios.post.mockRejectedValue(new Error('Creation failed'))
      await expect(backend.createNew('Test')).rejects.toThrow('Creation failed')
    })
  })
})

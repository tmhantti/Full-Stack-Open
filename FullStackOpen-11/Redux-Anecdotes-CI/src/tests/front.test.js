import { render, screen, fireEvent } from './test-utils'
import AnecdoteForm from '../components/AnecdoteForm'
import '@testing-library/jest-dom/extend-expect'

// initialize tests:
const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}))
// ------------------------------------------------------------------------------------------------------
describe('AnecdoteForm', () => {
  afterEach(() => {
    mockDispatch.mockClear()
  })

  test('dispatches the createAnecdote action with correct content when submitted', async () => {
    render(<AnecdoteForm />)

    const input = screen.getByRole('textbox')
    const form = screen.getByRole('form', { hidden: true })

    fireEvent.change(input, { target: { value: 'Test Anecdote' } })
    await fireEvent.submit(form)

    expect(mockDispatch).toHaveBeenCalledTimes(2) // One for createAnecdote and one for setNotification
  })
})
// ------------------------------------------------------------------------------------------------------
import AnecdoteList from '../components/AnecdoteList'
describe('AnecdoteList', () => {
  test('renders anecdotes correctly based on the state', () => {
    const initialState = {
      anecdotes: [
        { id: '1', content: 'First Anecdote', votes: 5 },
        { id: '2', content: 'Second Anecdote', votes: 3 },
      ],
      filter: '',
    }

    render(<AnecdoteList />, { initialState })

    expect(screen.getByText('First Anecdote')).toBeInTheDocument()
    expect(screen.getByText('Second Anecdote')).toBeInTheDocument()
  })
})



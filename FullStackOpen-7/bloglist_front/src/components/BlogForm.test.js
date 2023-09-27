import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('BlogForm updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('insert title here')
  const authorInput = screen.getByPlaceholderText('insert author here')
  const urlInput = screen.getByPlaceholderText('insert url here')
  const form = screen.getByTestId('blog-form')

  fireEvent.change(titleInput, { target: { value: 'Test Title' } })
  fireEvent.change(authorInput, { target: { value: 'Test Author' } })
  fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
  fireEvent.submit(form)

  expect(createBlog).toHaveBeenCalledWith({
    title: 'Test Title',
    author: 'Test Author',
    url: 'https://example.com',
  })
})

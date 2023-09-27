// Single unit test - Exercise 12.14

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Todo from '../Todos/Todo'

describe('<Todo />', () => {
  const dummyTodo = {
    text: 'Test Todo',
    done: false,
  }

  it('renders not done todo correctly', () => {
    render(<Todo todo={dummyTodo} deleteTodo={() => {}} completeTodo={() => {}} />) 
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument()
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Set as done' })).toBeInTheDocument()
  }) 

}) 

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

/* Seuraava testi: harjoitus 5.13
   HUOM: tehtävä 5.7 suoritettu, joten blogin otsikon testaaminen riittää */
test('renders content', () => {
  const blog = {
    title: 'blog title for test',
    url: 'blog url for test',
    author: 'blog author for test',
    likes: 0
  }

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blogBasicInfo')
  expect(div).toHaveTextContent(
    'blog title for test'
  )
})

// Seuraava testi: harjoitus 5.14
test('clicking the button show button shows details of the blog', async () => {
  const blog = {
    'title': 'Learning full stack development',
    'author': 'Satu Vanttila',
    'url': 'http://blog.satunblogi.com',
    'likes': 25,
    'user': {
      'username': 'sepi',
      'name': 'Seppo Servaaja',
      'id': '6482ce1b67b0522a69d8e374'
    },
    'id': '6482ed7226106cc6b8a591b1'
  }

  const mockToggleDetails = jest.fn()
  const mockLoggedUser= 'testaaja'

  const { container } = render(
    <Blog blog={blog}
      toggleDetails={mockToggleDetails}
      showDetails={false}
      loggedUser= {mockLoggedUser}
    />
  )

  const button = screen.getByText('show')
  await userEvent.click(button)

  const div = container.querySelector('.blogDetailedInfo')
  expect(div).toHaveTextContent('likes')
  expect(div).toHaveTextContent('http://blog.satunblogi.com')
  expect(div).toHaveTextContent('Servaaja')
})

/* Seuraava testi: harjoitus 5.15 */
test('clicking like button twice triggers twice the corresponding event handler', async () => {
  /* const blog = {
    'title': 'Learning full stack development',
    'author': 'Satu Vanttila',
    'url': 'http://blog.satunblogi.com',
    'likes': 25,
    'user': {
      'username': 'sepi',
      'name': 'Seppo Servaaja',
      'id': '6482ce1b67b0522a69d8e374'
    },
    'id': '6482ed7226106cc6b8a591b1'
  }

  // const mockToggleDetails = jest.fn()

  // const mockLoggedUser= 'testaaja'
/*
  const { container } = render(
    <Blog blog={blog}
      toggleDetails={mockToggleDetails}
      showDetails={true}
      loggedUser= {mockLoggedUser}
      addLikes={mockAddLike}
    />
  ) */

  const mockAddLike = jest.fn()
  // ekana avataan yksityiskohtainen näkymä, jotta saadaan 'like' painike esiin
  const showButton = screen.getByText('show')
  await userEvent.click(showButton)
  // sitten vasta testataan 'like' painikkeen toimintaa x 2:
  const likeButton = screen.getByText('like')
  await userEvent.click(likeButton)
  await userEvent.click(likeButton)
  expect(mockAddLike.mock.calls).toHaveLength(2)
})






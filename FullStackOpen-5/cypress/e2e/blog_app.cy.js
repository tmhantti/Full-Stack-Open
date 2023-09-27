describe('Blog app', function() {
  beforeEach(function() {
    // nollaa tietokanta:
    cy.request('POST', 'http://localhost:3003/bloglist/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'Teppo testaaja',
      username: 'testeri',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/bloglist/api/users/', user)
  })
  it('Login form is shown', function() {
    cy.contains('Log in')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testeri')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
      cy.contains('Teppo testaaja logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testeri')
      cy.get('#password').type('ssekret')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong username or password')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testeri')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('testing with Cypress')
      cy.get('#url').type('https://test.test.test')
      cy.get('#author').type('express Cypress tester')
      cy.get('#submitbutton').click()
      cy.get('.success').contains('A new blog')
    })
  })

})
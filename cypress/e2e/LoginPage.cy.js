describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login') // Gantilah '/login' dengan rute yang sesuai
  })

  it('should display the login form', () => {
    cy.get('.wrapper').should('be.visible')
    cy.get('.name').contains('PatientCare App')
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
    cy.get('button').contains('Login').should('be.visible')
  })

  it('should require email and password', () => {
    cy.get('button').contains('Login').click()
    cy.get('input[placeholder="Email"]:invalid').should('have.length', 1)
    cy.get('input[placeholder="Password"]:invalid').should('have.length', 1)
  })

  it('should show error on invalid login', () => {
    cy.intercept('POST', '/user/login', {
      statusCode: 401,
      body: { message: 'Invalid credentials' }
    }).as('loginRequest')

    cy.get('input[placeholder="Email"]').type('invalidemail@example.com')
    cy.get('input[placeholder="Password"]').type('wrongpassword')
    cy.get('button').contains('Login').click()
    cy.wait('@loginRequest')

    // Tunggu hingga elemen toast muncul
    cy.get('.Toastify__toast--error', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Login Failed')
  })

  it('should navigate to home on successful login', () => {
    cy.intercept('POST', '/user/login', {
      statusCode: 200,
      body: {
        data: {
          accessToken: 'fake-token',
          email: 'validemail@example.com',
          username: 'validuser',
          rules: []
        }
      }
    }).as('loginRequest')

    cy.get('input[placeholder="Email"]').type('validemail@example.com')
    cy.get('input[placeholder="Password"]').type('correctpassword')
    cy.get('button').contains('Login').click()
    cy.wait('@loginRequest')
    cy.url().should('include', '/home')
  })

  it('should navigate to register page', () => {
    cy.get('a').contains('Sign up').click()
    cy.url().should('include', '/register')
  })
})

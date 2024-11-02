describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth/login');
  });

  it('should display the login form', () => {
    cy.contains('Login');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
  });

  it('should show validation errors on empty submit', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid email address');
    cy.contains('Password must be at least 6 characters long');
  });

  it('should show error on failed login', () => {
    cy.get('input[type="email"]').type('test_correct@mail.com');
    cy.get('input[type="password"]').type('wrong_password');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials');
  });

  it('should login and logout successfully', () => {
    cy.intercept('POST', 'http://localhost:3010/api/auth/login').as('login');
    cy.get('input[type="email"]').type('test_correct@mail.com');
    cy.get('input[type="password"]').type('A123456B');
    cy.get('button[type="submit"]').click();
    cy.wait('@login').its('response.statusCode').should('eq', 201);
    cy.contains('Login successful');
    cy.url().should('include', '/dashboard');
  });

  it('should log in successfully, redirect to dashboard, and log out', () => {
    cy.intercept('POST', 'http://localhost:3010/api/auth/login').as(
      'loginRequest',
    );

    cy.get('input[type="email"]').type('test_correct@mail.com');
    cy.get('input[type="password"]').type('A123456B');
    cy.get('button[type="submit"]').click();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 201);
    cy.contains('Login successful');
    cy.url().should('include', '/dashboard');
    cy.get('button[data-sidebar="menu-button"]').click();
    cy.contains('Log out').click();
    cy.url().should('include', '/auth/login');
    cy.contains('Dashboard').should('not.exist');
  });
});

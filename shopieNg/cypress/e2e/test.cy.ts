describe('template spec', () => {
  it('Navigates to the products page', () => {
    cy.visit('http://localhost:4200/admin');

    cy.get('[data-cy="products-link-btn"]').click();
    cy.get('.cards');
  })
  it('Navigates to the customers page', ()=>{
    cy.visit('http://localhost:4200/admin');

    cy.get('[data-cy="customers-link-btn"]').click()

    cy.contains('kennynet66@gmail.com')
  })
  it('Navigates to the login page and parses the details',()=>{
    cy.visit('http://localhost:4200/login')

    cy.get('[data-cy="email-input"').type("kennynet66@gmail.com");
    cy.get('[data-cy="password-input"]').type('test12');
    cy.get('[data-cy="submit-login-btn"').click();
  })
})

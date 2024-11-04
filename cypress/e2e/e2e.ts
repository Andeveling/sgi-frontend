describe('Página de inicio', () => {
  it('Debe cargar correctamente', () => {
    cy.visit('/');
    cy.contains('Login'); 
  });
});

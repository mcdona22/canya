describe('Basic App Launch', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should render the basic container elements ', () => {
    cy.get('.data-app-container').should('be.visible');
    cy.get('.main-toolbar').should('be.visible');
    cy.get('.router-outlet').should('be.visible');
  });
  it('should show the toolbar');
  it('should show the app name');
  it('should show the menu options');
});

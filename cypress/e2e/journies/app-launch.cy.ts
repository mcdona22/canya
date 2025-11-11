describe('Basic App Launch', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should render the basic container elements ', () => {
    cy.get('.data-app-container').should('be.visible');
    cy.get('.main-toolbar').should('be.visible');
    cy.get('.router-outlet').should('be.visible');
  });
  it('should show the app name', () => {
    cy.get('.app-title').should('be.visible').and('contain.text', 'CanYa');
  });
  describe('should show correct menu options', () => {
    const expectedMenuItems = 2;
    const menuOptions = [
      { label: 'Home', path: '', tag: 'landing' },
      { label: 'Gangs', path: '/gangs', tag: 'gangs' },
    ];

    it('should have the correct number of menu items', () => {
      cy.get('.menu-items').should('be.visible');
      cy.get('.menu-item').should('have.length', menuOptions.length);
    });

    it('should have the auth button component', () => {
      cy.get('.data-auth-button').should('be.visible');
    });
    menuOptions.forEach((item) => {
      it(`should show the "${item.label}" item`, () => {
        const dataCss = `.data-item-${item.tag}`;
        console.log('button text', cy.get(dataCss));
        cy.get(dataCss).should('be.visible').and('include.text', item.label);
      });
    });
  });
});

describe('phonebook test', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('http://localhost:3000/')
    })
    
  it('is header visible', () => {
    // We use the `cy.get()` command to get all elements that match the selector.
    // Then, we use `should` to assert that there are two matched items,
    // which are the two default items.
    cy.get('#header h1').should('have.text', "PhoneBook Tutorial")
  });

  it('is add button visible', () => {
    cy.get('#addButtonDiv').should('contain', "Add Contact")
  });

  it('is button hover works', () => {
    cy.get('#addButtonDiv button')
    .trigger('mouseover').should('have.css','background-color','rgb(255, 255, 255)')
  });

  it('is button mouse leave works', () => {
    cy.get('#addButtonDiv button')
    .trigger('mouseleave').should('have.css','background-color','rgb(0, 128, 0)')
  });

  it('is table visible', () => {
    cy.get('.table').getTable().should(tableData => {
        // console.log(tableData)
        expect(tableData).to.have.length(1)
        expect(tableData).contain("First name")
        expect(tableData).contain("Last name")
        expect(tableData).contain("Phone")
        expect(tableData).contain("Email")
        expect(tableData).contain("Action")
    })
  });
})
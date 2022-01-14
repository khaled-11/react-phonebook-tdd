import('cypress-get-table')
describe('phonebook test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })
    
    it('is header visible', () => {
        cy.get('#header h1').should('have.text', "PhoneBook Tutorial")
    });

    it('is add button visible and hover works', () => {
        cy.get('#addButtonDiv').should('contain', "Add Contact")
        cy.get('#addButtonDiv button')
        .trigger('mouseover').should('have.css','background-color','rgb(255, 255, 255)')
    });

    it('is button mouse leave works', () => {
        cy.get('#addButtonDiv button')
        .trigger('mouseleave').should('have.css','background-color','rgb(0, 128, 0)')
    });

    it('is table visible', () => {
        cy.get('#table').getTable().should(tableData => {
            // console.log(tableData)
            expect(tableData).to.have.length(1)
        })
        cy.get('#table').should('contain', "First name")
        cy.get('#table').should('contain', "Last name")
        cy.get('#table').should('contain', "Phone")
        cy.get('#table').should('contain', "Email")
        cy.get('#table').should('contain', "Action")
    });

    it('Add Contact Function', () => {
        cy.get('#add_section').should('not.exist');
        cy.get('#table').should('be.visible');
        cy.get('#addButtonDiv button').click()        
        cy.get('#add_section').should('be.visible');
        cy.get('#table').should('not.exist');
        cy.get('#add_section button').click()
        cy.get('#table').should('be.visible');
        cy.get('#add_section').should('not.exist');

        // cy.get('#add_section label').should('contain', "First name")
        // cy.get('#add_section label').should('contain', "Last name")
        // cy.get('#add_section label').should('contain', "Phone")
        // cy.get('#add_section label').should('contain', "Email")
        // cy.get('#add_section input').should('contain', "Add User")
        // cy.get('#add_section button').should('contain', "Cancel")
        // cy.get('#add_section button').click()
        // cy.get('#add_section').should('not.exist');
        // cy.get('#table').should('be.visible');
        // cy.get('#addButtonDiv button').click()
        // cy.get('#add_section').should('be.visible');
        // cy.get('#table').should('not.exist');
    });
})
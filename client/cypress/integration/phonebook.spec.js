// import('cypress-get-table')

describe('phonebook test', () => {
    it('is header visible', () => {
        cy.visit('http://localhost:3000/')
        // Check Header
        cy.get('#header h1').should('have.text', "PhoneBook Tutorial")
    });

    it('is add button, table and counter visible', () => {
        // Check Add button, table for the contacts, and contacts count
        cy.get('#addButtonDiv').should('contain', "Add Contact")
        cy.get('#table').should('contain', "First name")
        cy.get('#table').should('contain', "Last name")
        cy.get('#table').should('contain', "Phone")
        cy.get('#table').should('contain', "Email")
        cy.get('#table').should('contain', "Action")
        cy.get('#counter').should('contain', "Total Contacts: 0")
    });

    it('is add button hide the table and display the add form', () => {
        // Check that the add contact form is hidden and add button display it
        cy.get('#add_section').should('not.exist');
        cy.get('#table').should('be.visible');
        cy.get('#addButtonDiv button').click()
        cy.get('#addButtonDiv button').should('not.exist');        
        cy.get('#table').should('not.exist');
        // Check the add form elements
        cy.get('#add_section h3').should('contain', "Add Contact")
        cy.get('#add_section form label').should('contain', "First name:")
        cy.get('#add_section form label').should('contain', "Last name:")
        cy.get('#add_section form label').should('contain', "Phone:")
        cy.get('#add_section form label').should('contain', "Email")
        cy.get('#add_section form label').should('contain', "Details:")
        cy.get('input[name="first_name"]').should('have.value', "First Name")
        cy.get('input[name="last_name"]').should('have.value', "Last Name")
        cy.get('input[name="phone"]').should('have.value', "xxx-xxx-xxxx")
        cy.get('input[name="email"]').should('have.value', "name@domain.com")
        cy.get('input[name="detail"]').should('have.value', "N/A")
        cy.get('.submit-btn').should('have.value', "Add Contact")
    });

    it('is cancel button and add dummy contact works', () => {
        // Check cancel button and the display
        cy.get('.cancel-btn').click()
        cy.get('#add_section').should('not.exist');        
        cy.get('#addButtonDiv button').should('be.visible');        
        cy.get('#counter').should('contain', "Total Contacts: 0")
        // Add dummy contact with the default data
        cy.get('#addButtonDiv button').click()
        cy.get('.submit-btn').click()
        cy.get('#add_section').should('not.exist');        
        cy.get('#addButtonDiv button').should('be.visible');        
        // Check the table and counter
        cy.get('#counter').should('contain', "Total Contacts: 1")
        cy.get('#table').should('contain', "name@domain.com")
    });

    it('is delete button works for single and multiple items', () => {
        // Delete the dummy entry and check count
        cy.contains('td','name@domain.com')
        .siblings().contains('button', 'Delete')
        .click()
        cy.contains('name@domain.com').should('not.exist')
        cy.get('#counter').should('contain', "Total Contacts: 0")
        // Add first dummy entry  and check count
        cy.get('#addButtonDiv button').click()
        cy.get('.submit-btn').click()
        cy.get('#table').should('contain', "name@domain.com")
        cy.get('#counter').should('contain', "Total Contacts: 1")
        // Add second entry with different value and check count
        cy.get('#addButtonDiv button').click()
        cy.get('input[name="first_name"]').clear()
        cy.get('input[name="first_name"]').type("Khaled")
        cy.get('input[name="last_name"]').clear()
        cy.get('input[name="last_name"]').type("Abouseada")
        cy.get('.submit-btn').click()
        cy.get('#table').should('contain', "Abouseada")
        cy.get('#counter').should('contain', "Total Contacts: 2")
        // delete the second entry and check count
        cy.contains('td','Abouseada')
        .siblings().contains('button', 'Delete')
        .click()
        cy.contains('Abouseada').should('not.exist')
        cy.get('#counter').should('contain', "Total Contacts: 1")
        // delete the first entry and check count
        cy.contains('td','name@domain.com')
        .siblings().contains('button', 'Delete')
        .click()
        cy.contains('name@domain.com').should('not.exist')
        cy.get('#counter').should('contain', "Total Contacts: 0")
    });

    it('does the app prevent duplicate contacts', () => {
        // Add first dummy entry and check count
        cy.get('#addButtonDiv button').click()
        cy.get('.submit-btn').click()
        cy.get('#table').should('contain', "name@domain.com")
        cy.get('#counter').should('contain', "Total Contacts: 1")
        // Add deplicate entry to check error
        cy.get('#addButtonDiv button').click()
        cy.get('.submit-btn').click()
        cy.get('#error_add').should('contain', "This contact already exists.")
        // Edit the value and submit
        cy.get('input[name="last_name"]').clear()
        cy.get('input[name="last_name"]').type("Abouseada")        
        cy.get('.submit-btn').click()
        cy.get('#table').should('contain', "Abouseada")
        cy.get('#counter').should('contain', "Total Contacts: 2")
        cy.contains('td','Abouseada')
        .siblings().contains('button', 'Delete')
        .click()
        cy.get('#counter').should('contain', "Total Contacts: 1")
        cy.contains('td','name@domain.com')
        .siblings().contains('button', 'Delete')
        .click()
        cy.get('#counter').should('contain', "Total Contacts: 0")
    });

    it('is edit contact works', () => {
        // Add first dummy entry and check count
        cy.get('#addButtonDiv button').click()
        cy.get('.submit-btn').click()
        cy.contains('td','name@domain.com')
        .siblings().contains('button', 'Delete')
        .click()
        cy.get('#counter').should('contain', "Total Contacts: 0")
    });
})
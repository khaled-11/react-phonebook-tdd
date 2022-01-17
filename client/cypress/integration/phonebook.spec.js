// import('cypress-get-table')

describe('phonebook test', () => {
    it('is header visible', () => {
        cy.visit('http://localhost:3000/')
        // Check Header
        cy.get('#header h1').should('have.text', "PhoneBook Tutorial")
    });

    it('is add button, table and counter visible', () => {
        // Check Add button, table for the contacts, and contacts count
        cy.get('#main').should('contain', "Add Contact")
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
        cy.get('#add_button').click()
        cy.get('#add_button').should('not.exist');        
        cy.get('#table').should('not.exist');
        // Check the add form elements
        cy.get('#add_section h3').should('contain', "Add Contact")
        cy.get('#add_section form label').should('contain', "First name:")
        cy.get('#add_section form label').should('contain', "Last name:")
        cy.get('#add_section form label').should('contain', "Phone:")
        cy.get('#add_section form label').should('contain', "Email")
        cy.get('#add_section form label').should('contain', "Details:")
        cy.get('input[name="first_name"]').should('have.value', "First name")
        cy.get('input[name="last_name"]').should('have.value', "Last name")
        cy.get('input[name="phone"]').should('have.value', "xxx-xxx-xxxx")
        cy.get('input[name="email"]').should('have.value', "name@domain.com")
        cy.get('input[name="detail"]').should('have.value', "N/A")
        cy.get('.submit-btn').should('have.value', "Add Contact")
    });

    it('is cancel button and add dummy contact works', () => {
        // Check cancel button and the display
        cy.get('.cancel-btn').click()
        cy.get('#add_section').should('not.exist');        
        cy.get('#add_button').should('be.visible');        
        cy.get('#counter').should('contain', "Total Contacts: 0")
        // Add dummy contact with the default data
        cy.get('#add_button').click()
        cy.get('.submit-btn').click()
        cy.get('#add_section').should('not.exist');        
        cy.get('#add_button').should('be.visible');        
        // Check the table and counter
        cy.get('#counter').should('contain', "Total Contacts: 1")
        cy.get('#table').should('contain', "name@domain.com")
    });

    it('is delete button works for single and multiple items', () => {
        // Delete the dummy entry and check count
        cy.contains('td','name@domain.com')
        .siblings().contains('button', 'Delete')
        .click()
        cy.get('#del_con').should('contain', "Do you want to permanently delete First name")
        cy.get('#con_del').click()
        cy.get('#counter').should('contain', "Total Contacts: 0")
        cy.contains('name@domain.com').should('not.exist')
        // Add first dummy entry  and check count
        cy.get('#add_button').click()
        cy.get('.submit-btn').click()
        cy.get('#table').should('contain', "name@domain.com")
        cy.get('#counter').should('contain', "Total Contacts: 1")
        // Add second entry with different value and check count
        cy.get('#add_button').click()
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
        cy.get('#del_con').should('contain', "Do you want to permanently delete Khaled")
        cy.get('#con_del').click()
        cy.contains('Abouseada').should('not.exist')
        cy.get('#counter').should('contain', "Total Contacts: 1")
        // delete the first entry and check count
        cy.contains('td','name@domain.com')
        .siblings().contains('button', 'Delete')
        .click()
        cy.get('#del_con').should('contain', "Do you want to permanently delete First name")
        cy.get('#con_del').click()
        cy.contains('name@domain.com').should('not.exist')
        cy.get('#counter').should('contain', "Total Contacts: 0")
    });

    it('does the app prevent duplicate contacts', () => {
        // Add first dummy entry and check count
        cy.get('#add_button').click()
        cy.get('.submit-btn').click()
        cy.get('.submit-btn').click()
        cy.get('#table').should('contain', "name@domain.com")
        cy.get('#counter').should('contain', "Total Contacts: 1")
        // Add deplicate entry to check error
        cy.get('#add_button').click()
        cy.get('.submit-btn').click()
        cy.get('.submit-btn').click()
        cy.get('#error_add').should('contain', "This contact already exists.")
        // Edit the value and submit
        cy.get('input[name="last_name"]').clear()
        cy.get('input[name="last_name"]').type("Abouseada")        
        cy.get('.submit-btn').click()
        cy.get('.submit-btn').click()
        cy.get('#table').should('contain', "Abouseada")
        cy.get('#counter').should('contain', "Total Contacts: 2")
    });

    it('Is edit contact function works', () => {
        // Click edit on the contact row
        cy.contains('td','First name')
        .siblings().contains('button', 'Edit')
        .click()
        cy.get('input[name="last_name"]').clear()
        cy.get('input[name="last_name"]').type("Abouseada")
        cy.get(".submit-btn").click()
        cy.get('#error_add').should('contain', "This contact data already exists.")
        cy.get('input[name="last_name"]').clear()
        cy.get('input[name="last_name"]').type("John")
        cy.get(".submit-btn").click()
        cy.get('#table').should('contain', "John")
        cy.contains('td','Abouseada')
        .siblings().contains('button', 'Delete')
        .click()
        cy.get('#con_del').click()
        cy.get('#counter').should('contain', "Total Contacts: 1")
        cy.contains('td','John')
        .siblings().contains('button', 'Delete')
        .click()
        cy.get('#con_del').click()
        cy.get('#counter').should('contain', "Total Contacts: 0")
    }); 

    it('Will the app display error message on network connection error with the server', () => {
        // Add first dummy entry and click submit twice
        cy.get('#add_button').click()
        // Wait till I shut the server down
        cy.wait(3500)
        cy.get('.submit-btn').click()
        cy.wait(2500)
        cy.get('#error_add').should('contain', "Network Error! Please try again.")
        cy.get('.cancel-btn').click()
        cy.get('#add_button').click()
        cy.contains('Network Error!').should('not.exist')
        cy.visit('http://localhost:3000/')
        cy.wait(2500)
        cy.get('#error_main').should('contain', "Please Refresh!")
    });
})
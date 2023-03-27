Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
        cy.get('#firstName').type('Carol')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('mcarolina1950@hotmail.com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

})
/// <reference types="Cypress" 

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){   //before each (antes de testar tudo, ele vai visitar a página)
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

        it('preenche os campos obrigatórios e envia o formulário', function() {
            const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
            cy.get('#firstName').type('Carol')
            cy.get('#lastName').type('Oliveira')
            cy.get('#email').type('mcarolina1950@hotmail.com')
            cy.get('#open-text-area').type(longText, {delay:0})  //delay (tempo que vai demorar pra testar)
            cy.get('button[type="submit"]').click()

            cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Carol')
            cy.get('#lastName').type('Oliveira')
            cy.get('#email').type('mcarolina1950@hotmail,com') //email incorreto
            cy.get('#open-text-area').type('teste')
            cy.get('button[type="submit"]').click()

            cy.get('.error').should('be.visible')
    })

        it('Campo telefone continua vazio quando preenchido com valor não numérico', function(){ //it.only testa somente esse
            cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', "")

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Carol')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('mcarolina1950@hotmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
        .type('Maria')
        .should('have.value', 'Maria')
        .clear()
        .should('have.value', '')
        cy.get('#open-text-area')
        .type('teste2')
        .should('have.value', 'teste2')
        .clear()
        .should('have.value', '')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()   //clicou no botão sem preencher os campos e deu mensagem de erro
        cy.get('.error').should('be.visible')
    })

    it.only('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit() 

        cy.get('.success').should('be.visible')

    })

})
    

  
  
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
            cy.contains('button', 'Enviar').click()

            cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Carol')
            cy.get('#lastName').type('Oliveira')
            cy.get('#email').type('mcarolina1950@hotmail,com') //email incorreto
            cy.get('#open-text-area').type('teste')
            cy.contains('button', 'Enviar').click()

            cy.get('.error').should('be.visible')
    })

        it('Campo telefone continua vazio quando preenchido com valor não numérico', function(){ //it.only testa somente esse
            cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', "")

    })

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Carol')
        cy.get('#lastName').type('Oliveira')
        cy.get('#email').type('mcarolina1950@hotmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

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
        cy.contains('button', 'Enviar').click()   //clicou no botão sem preencher os campos e deu mensagem de erro
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit() //executa o comando da pasta (commands.js)

        cy.get('.success').should('be.visible')

    })

    it('seleciona um produto (youtube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')

    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')

    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should('have.value', 'feedback')

    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')

        })

    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()   //check= seleciona as check boxes
        .should('be.checked')
        .last()    //seleciona o ultimo elemento de checkbox
        .uncheck()  // desmarcou o que era last (telefone)
        .should('not.be.checked')
        
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            //console.log($input)//
            expect($input[0].files[0].name).to.equal('example.json')
        })


    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){ //drag and drop: quando arrasta da pasta de docs do pc direto pro upload da pagina//
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action:'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })

    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')

    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
        .invoke('removeAttr','target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')


    })

    

    




})
    

  
  
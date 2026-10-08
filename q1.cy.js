describe("Questão 1 - Validação de Mensagem de Erro no Login", () => {
    it("Deve validar mensagem de erro e classe CSS ao clicar em Login em branco", () => {
        Cypress.on("uncaught:exception", () => false);

        cy.visit("https://the-internet.herokuapp.com/login");

        cy.get("button[type='submit']").click();

        cy.get("#flash", { timeout: 15000 })
            .should("be.visible")
            .and("have.class", "error")
            .and("contain.text", "Your username is invalid!");
    });
});
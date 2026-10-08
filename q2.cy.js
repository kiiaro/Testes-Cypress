describe("Questão 2 - Carregamento Dinâmico (Spinner)", () => {
    it("Deve aguardar o spinner desaparecer e validar o texto Hello World!", () => {
        Cypress.on("uncaught:exception", () => false);

        cy.visit("https://the-internet.herokuapp.com/dynamic_loading/1", {
            timeout: 120000,
            retryOnNetworkFailure: true
        });

        cy.contains("button", "Start").click();

        cy.get("#loading", { timeout: 30000 }).should("not.be.visible");

        cy.get("#finish h4", { timeout: 30000 })
            .should("be.visible")
            .and("have.text", "Hello World!");
    });
});
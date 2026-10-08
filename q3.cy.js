describe("Questão 3 - Fluxo E2E de Carrinho no SauceDemo", () => {
    it("Deve adicionar 3 produtos, remover 1 e validar emblema com valor 2", () => {
        Cypress.on("uncaught:exception", () => false);

        cy.visit("https://www.saucedemo.com/", {
            timeout: 120000,
            retryOnNetworkFailure: true
        });

        cy.get("#user-name").type("standard_user");
        cy.get("#password").type("secret_sauce");
        cy.get("#login-button").click();

        cy.get(".inventory_item", { timeout: 20000 }).should("have.length.at.least", 3);

        cy.get(".inventory_item").eq(0).contains("button", "Add to cart").click();
        cy.get(".inventory_item").eq(1).contains("button", "Add to cart").click();
        cy.get(".inventory_item").eq(2).contains("button", "Add to cart").click();

        cy.get(".inventory_item").eq(0).contains("button", "Remove").click();

        cy.get(".shopping_cart_badge", { timeout: 15000 })
            .should("be.visible")
            .and("have.text", "2");
    });
});
describe("Questão 4 - Extração do Laptop Mais Caro no Demoblaze", () => {
    it("Deve buscar a categoria Laptops, extrair o mais caro e validar que o valor é > $0", () => {
        Cypress.on("uncaught:exception", () => false);

        // Acesse o site diretamente
        cy.visit("https://www.demoblaze.com/", {
            timeout: 120000,
            failOnStatusCode: false
        });

        // Clica na categoria Laptops
        cy.contains("a", "Laptops", { timeout: 20000 }).click();

        // Aguarda carregar os produtos
        cy.get("#tbodyid .col-lg-4", { timeout: 30000 }).should("have.length.at.least", 1);

        let maiorPreco = 0;

        cy.get("#tbodyid .col-lg-4").each(($el) => {
            const precoTexto = $el.find("h5").text().trim();
            const precoNumero = parseFloat(precoTexto.replace("$", ""));

            if (!isNaN(precoNumero) && precoNumero > maiorPreco) {
                maiorPreco = precoNumero;
            }
        }).then(() => {
            expect(maiorPreco).to.be.greaterThan(0);
        });
    });
});
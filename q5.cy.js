describe("Questão 5 - Rastreamento de Ofertas Menores que $20.00 em CSV", () => {
    it("Deve mapear os produtos, filtrar os < $20.00 e salvar em arquivo .csv na pasta downloads", () => {
        Cypress.on("uncaught:exception", () => false);

        cy.visit("https://www.saucedemo.com/", {
            timeout: 120000,
            retryOnNetworkFailure: true
        });

        cy.get("#user-name").type("standard_user");
        cy.get("#password").type("secret_sauce");
        cy.get("#login-button").click();

        const ofertasAbaixo20 = [];

        cy.get(".inventory_item", { timeout: 20000 }).each(($el) => {
            const nome = $el.find(".inventory_item_name").text().trim();
            const precoTexto = $el.find(".inventory_item_price").text().trim();
            const preco = parseFloat(precoTexto.replace("$", ""));

            if (!isNaN(preco) && preco < 20.00) {
                ofertasAbaixo20.push({
                    Nome: nome,
                    Preco: `$${preco.toFixed(2)}`
                });
            }
        }).then(() => {
            expect(ofertasAbaixo20.length).to.be.greaterThan(0);

            // Envia os dados filtrados para a task salvar o CSV na pasta cypress/downloads
            cy.task("salvarCSV", {
                dados: ofertasAbaixo20,
                nomeArquivo: "ofertas_abaixo_20.csv"
            });
        });
    });
});
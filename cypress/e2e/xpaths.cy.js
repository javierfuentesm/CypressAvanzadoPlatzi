describe("Pruebas con xpaths", () => {
  it("Obtengo por css selector", () => {
    cy.visit("/");
    cy.get(
      "#root > div.container > div:nth-child(1) > div:nth-child(1) > div > center > div.card-header > h1"
    ).should("contain", "Bulbasaur");
  });
  it("Obtener por xpath", () => {
    cy.visit("/");
    cy.xpath('//h1[contains(text(), "Bulbasaur")]').should("be.visible");
    //usar solo cuando sea necesario ya que esto se podria usar asi
    // cy.contains("Bulbasaur").should("be.visible");
  });
});

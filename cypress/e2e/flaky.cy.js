describe("Flaky tests", () => {
  it.only("Single query command", () => {
    cy.visit("/");

    //
    //solo el contians se reintentó el h1 ya se había encontrado esto puede ser un problema cuando tienes campos dinamicos como el .get ya se hizo vas seguir teniendo el mismo elemento siempre
    // cy.get(
    //   "#root > div.container > div:nth-child(1) > div:nth-child(1) > div > center > div.card-header > h1"
    // ).contains("Bulbaaaasaur");

    // como se soluciona? haciendo todo en un solo query ya que el retry se hace de forma automatica

    cy.contains(
      "#root > div.container > div:nth-child(1) > div:nth-child(1) > div > center > div.card-header > h1",
      "Bulbaaaasaur"
    );
  });
  it("Alternar comando con aserciones", () => {
    cy.visit("/");

    // esto reintentara el cy.get hasta que la asercion pase esto sirve pro ejemplo cuando tenemos un boton de un formulario que no se encuentra habilitado
    // esto fallaria porque el boton no se encuentra habilitado
    // cy .get('#submit').click()
    // esto va a reintentar el cy.get hasta que la asercion pase
    // cy.get('#submit').should('not.to.be.disabled').click()

    cy.get(
      "#root > div.container > div:nth-child(1) > div:nth-child(1) > div > center > div.card-header > h1"
    )
      .should("contain", "Bulbasaur")
      //ahora aqui ya tenemos el correcto
      .parent()
      .should("have.class", "card-header");
  });
});

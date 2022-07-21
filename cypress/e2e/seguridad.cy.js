describe("Seguridad", function () {
  it("navegar diferentes domininios", function () {
    //esto va a fallar
    cy.visit("https://todo-cypress-iota.vercel.app");
    cy.get("#title").type("Titulo de prueba");
    cy.visit("https://pokedexpokemon.netlify.app");
  });

  it.only("navego un dominio aqui", function () {
    cy.visit("https://todo-cypress-iota.vercel.app");
    cy.get("h1").invoke("text").as("titulo");
  });
  it.only("navego otro dominio aqui", function () {
    // si usamos el mismo dominio no va a fallar si queremos compartir informacion entre dominios
    cy.visit("https://todo-cypress-iota.vercel.app");
    //descoemntar este y el otro para que vean como falla
    // cy.visit("https://pokedexpokemon.netlify.app");
    cy.log(this.titulo);
  });
});

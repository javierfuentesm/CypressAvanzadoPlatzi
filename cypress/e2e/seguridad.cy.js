let texto, text2;

describe("Seguridad", function () {
  it("navegar diferentes domininios", function () {
    //esto va a fallar
    cy.visit("https://todo-cypress-iota.vercel.app");
    cy.get("#title").type("Titulo de prueba");
    cy.visit("https://pokedexpokemon.netlify.app");
  });

  it("navego un dominio aqui", function () {
    cy.visit("https://todo-cypress-iota.vercel.app");
    cy.get("h1").invoke("text").as("titulo");
  });
  it("navego otro dominio aqui", function () {
    // si usamos el mismo dominio no va a fallar si queremos compartir informacion entre dominios
    cy.visit("https://todo-cypress-iota.vercel.app");
    //descoemntar este y el otro para que vean como falla
    // cy.visit("https://pokedexpokemon.netlify.app");
  });

  it.only("navego dos dominios en el mismo test", function () {
    cy.visit("/");
    cy.get("h1")
      .first()
      .invoke("text")
      .then((text) => {
        texto = text;
      });
    cy.origin(
      "https://todo-cypress-iota.vercel.app",
      { args: { texto } },
      function ({ texto }) {
        cy.visit("/");
        // esto va a seguir fallando
        // cy.log(this.titulo);
        //se puede hacer con la variable pero se tiene que pasar como un argumento
        cy.log(texto);

        cy.get("h1")
          .invoke("text")
          .then((text) => {
            //esto va a fallar
            text2 = text;
          });
      }
    );
    //es importante vovler a la pagina original para que lo detecte sino nos mostrara un error
    cy.visit("/");
    // cy.wait(1000);
    cy.get("h1").first().invoke("text").should("be.equal", "Bulbasaur");

    //no sirve copartir asi
    cy.log(text2);
  });
});

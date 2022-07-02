// la va a preservar pero la proxima corrida va a fallar el primer test porque ya hay cookies
// Cypress.Cookies.defaults({
//   preserve: "nombre",
// });

describe("Cookies", () => {
  // before(() => {
  //   cy.clearCookies();
  // });
  // after(function () {
  //   cy.clearCookie("nombre");
  // });
  it("Obtener las cookies", () => {
    cy.visit("https://pokedexpokemon.netlify.app");
    //obtener las cookies
    cy.getCookies().should("be.empty");
  });
  it("Agregar una cookie", () => {
    // cy.visit("/");
    //agregar una cookie
    cy.setCookie("nombre", "Javier");
    cy.getCookies().should("have.length", 1);
  });
  it("Obtener una cookie en especifico", () => {
    //esto va a fallar porque cypress limpia las cookies entre tests se tiene que habilitar el Cypress.Cookies
    cy.getCookie("nombre").should("have.property", "value", "Javier");
    cy.clearCookies();
  });
});

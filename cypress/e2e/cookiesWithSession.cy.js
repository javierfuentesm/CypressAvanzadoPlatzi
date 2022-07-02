// la va a preservar pero la proxima corrida va a fallar el primer test porque ya hay cookies
// Cypress.Cookies.defaults({
//   preserve: "nombre",
// });

describe("Cookies", () => {
  //sustituye al  Cypress.Cookies.preserveOnce
  // before(() => {
  //   cy.session("login", () => {
  //     cy.visit("/");
  //     cy.setCookie("nombre", "Javier");
  //   });
  // });

  //sustituye al  Cypress.Cookies.default
  beforeEach(() => {
    cy.session("login", () => {
      cy.visit("/");
      cy.setCookie("nombre", "Javier");
    });
  });

  it("Obtener una cookie", () => {
    //se necesita visitar el visit(/) porque por defecto manda a una pagina en blanco
    // pero no es mas lento porque guarda la session
    cy.visit("/");
    cy.getCookies().should("have.length", 1);
  });
  it("Obtener una cookie en especifico", () => {
    cy.visit("/");
    //esto va a fallar porque cypress limpia las cookies entre tests
    cy.getCookie("nombre").should("have.property", "value", "Javier");
  });
});

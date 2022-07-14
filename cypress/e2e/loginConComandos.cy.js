describe("login con custom commands", () => {
  it("login erroneo", () => {
    cy.login("username111", "password111");
  });
  it("login exitoso", () => {
    cy.login("username", "password");
  });
});

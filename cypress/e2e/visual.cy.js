describe("Visual Testing", () => {
  it("mi primer prueba de regresion", () => {
    cy.visit("/");
    //primero sin el timer despues con el timer
    cy.wait(1000);
    cy.matchImageSnapshot();
    //va a falalr y enseñar a actualizar el snapshot
  });

  it("mi segunda prueba de regresion a solo un elemento", () => {
    cy.visit("/");
    cy.contains("Bulbasaur").should("be.visible").matchImageSnapshot();
  });
});

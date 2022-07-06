//arreglo de dispositivos
const dispositivos = [
  { viewport: "macbook-15", type: "desktop" },
  { viewport: "ipad-2", type: "mobile" },
  { viewport: [1280, 720], type: "desktop" },
  { viewport: [375, 667], type: "mobile" },
];

describe("Emulando dispositivos", () => {
  // it("Usando el viewport", () => {
  //   cy.viewport(1280, 720);
  //   cy.visit("/");
  //   cy.contains("Safari").should("exist");
  // });
  // it("Usando el viewport para mobile", function () {
  //   cy.viewport(375, 667);
  //   cy.visit("/");
  //   cy.contains("Safari").should("not.be.visible");
  // });
  // it("Usando el viewport con un preset para desktop", () => {
  //   cy.viewport("macbook-15");
  //   cy.visit("/");
  //   cy.contains("Safari").should("exist");
  // });
  //
  // it("Usando el viewport con un preset para movil", () => {
  //   // cy.viewport("iphone-6");
  //   cy.viewport("iphone-6", "landscape");
  //   cy.visit("/");
  //   cy.contains("Safari").should("not.be.visible");
  // });

  //probar con diferentes viewports de forma dinamica

  dispositivos.forEach((device) => {
    // make assertions on the logo using
    // an array of different viewports
    it(`Prueba con el viewport ${device.viewport}`, () => {
      if (Cypress._.isArray(device.viewport)) {
        cy.viewport(device.viewport[0], device.viewport[1]);
      } else {
        cy.viewport(device.viewport);
      }
      cy.visit("/");
      if (device.type === "desktop") {
        cy.contains("Safari").should("be.visible");
      } else {
        cy.contains("Safari").should("not.be.visible");
      }
    });
  });
});

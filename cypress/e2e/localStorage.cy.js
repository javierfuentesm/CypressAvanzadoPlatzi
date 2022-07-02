describe("Probando localStorage", () => {
  // beforeEach(() => {
  //   cy.session("setting todo", () => {
  //     //en vez de hacer estos 3 pasos se puede hacer uno solo
  //     // cy.get("#title").type("Titulo de prueba");
  //     // cy.get("#description").type("Descripcion de una tarea");
  //     // cy.contains("Create").click();
  //     cy.visit("https://todo-cypress-iota.vercel.app").then(() => {
  //       localStorage.setItem(
  //         "react_todo_ids",
  //         JSON.stringify(["Titulo de prueba"])
  //       );
  //       localStorage.setItem(
  //         "Titulo de prueba",
  //         JSON.stringify({
  //           title: "Titulo de prueba",
  //           description: "Descripcion de una tarea",
  //           complete: false,
  //           id: "Titulo de prueba",
  //         })
  //       );
  //     });
  //   });
  // });

  it("Crear una tarea en el TODO", function () {
    cy.visit("https://todo-cypress-iota.vercel.app");
    cy.get("#title").type("Titulo de prueba");
    cy.get("#description").type("Descripcion de una tarea");
    cy.contains("Create").click();
    // una validacion pero no muy buena para saber si se creo la tarea
    cy.contains("Titulo de prueba");
    // recarga la pagina es una manera de comprobar que la tarea es persitente
    cy.reload();
    //validar en el localStorage
    cy.contains("Titulo de prueba").then(() => {
      expect(localStorage.getItem("Titulo de prueba")).to.exist;
    });
    //borrar el localStorage
    //ten en cuenta que esto solo funcionara porque es el unico elemento que dice Remove si tenemos mas esto fallara y no sera una buena forma de validar
    cy.contains("Remove")
      .click()
      .then(() => {
        expect(localStorage.getItem("Titulo de prueba")).to.not.exist;
      });

    //en caso de que necesitemos borrar todo el localStorage en la misma prueba  y que no usemos sesiones se puede hacer asi, casi no tendras que usar eso si decides dejar que cypress limpie por ti el estado entre cada prueba

    cy.clearLocalStorage("Titulo de prueba").should((ls) => {
      expect(ls.getItem("prop1")).to.be.null;
    });
  });

  it("Valido que la tarea se creo correctamente", function () {
    // recuerda que todo se borra entre tests por lo cual esto va a fallar
    cy.visit("https://todo-cypress-iota.vercel.app");
    expect(localStorage.getItem("Titulo de prueba")).to.exist;
    // se necesita usar session
  });
});

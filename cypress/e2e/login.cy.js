import {loginPage} from "../pageObjects/LoginPage";

describe("login con page object", () => {
    beforeEach(() => {
        loginPage.visit();
    });

    it("login erroneo", () => {
        loginPage.validatePageLogin();
        loginPage.login("username111", "password111");
        loginPage.validateErrorLogin();
    });

    it("login exitoso con cy.env", () => {
        loginPage.validatePageLogin();
        // las Cy.env aunque las setes durante la prueba ese es su scope no estaran disponibles en otros tests
        //Great for values that need to be checked into source control and remain the same on all machines.
        //Only works for values that should be the same on across all machines.
        cy.log(Cypress.env());
        loginPage.login(
            Cypress.env("credentials").user,
            Cypress.env("credentials").password
        );
        loginPage.validateSuccessLogin();
    });

    it("login erroneo con cy.env.json", () => {
        loginPage.validatePageLogin();
        //Dedicated file just for environment variables.
        //Enables you to generate this file from other build processes.
        //Values can be different on each machine (if not checked into source control).
        // Another file you have to deal with.
        // Overkill for 1 or 2 environment variables.

        //si lo nombramos de igual manera se va a sobre escribir

        cy.log(Cypress.env());
        loginPage.login(
            Cypress.env("credentials").user,
            Cypress.env("credentials").password
        );
        loginPage.validateErrorLogin();
        //Variable de entorno seteada desde el comando de cypress open o cypress run
        // Benefits
        //
        // Does not require any changes to files or configuration.
        //     More clear where environment variables come from.
        //     Allows for dynamic values between different machines.
        //     Overwrites all other forms of setting env variables.
        //     Downsides
        //
        // Pain to write the --env options everywhere you use Cypress.
        //     No support for nested fields.
    });

    it("login con variable de entorno de la terminal", () => {
        loginPage.validatePageLogin();

        //Variable de entorno seteada desde el comando de cypress open o cypress run
        // Benefits
        //
        // Does not require any changes to files or configuration.
        //     More clear where environment variables come from.
        //     Allows for dynamic values between different machines.
        //     Overwrites all other forms of setting env variables.
        //     Downsides
        //
        // Pain to write the --env options everywhere you use Cypress.
        //     No support for nested fields.
        cy.log(Cypress.env());
        loginPage.login(
            Cypress.env("credentials").user,
            Cypress.env("credentials").password
        );
        loginPage.validateErrorLogin();
    });
});

describe(
    "login erroneo con configuracion",
    {
        env: {
            usuarioErroneo: "error1",
            passwordErroneo: "error2",
        },
    },
    () => {
        beforeEach(() => {
            loginPage.visit();
        });

        it("login erroneo", () => {
            loginPage.validatePageLogin();
            cy.log(Cypress.env());
            loginPage.login(
                Cypress.env("usuarioErroneo"),
                Cypress.env("passwordErroneo")
            );
            loginPage.validateErrorLogin();
        });

        it("login erroneo con variables de entorno", () => {
            loginPage.validatePageLogin();
            cy.log(Cypress.env());
            loginPage.login(Cypress.env("variable"), Cypress.env("variable"));
            loginPage.validateErrorLogin();
        });
    }
);


describe('login erroneo con fixtures', () => {
    beforeEach(() => {
        loginPage.visit();
    });

    it('login exitoso con fixtures', () => {
            loginPage.validatePageLogin();

            cy.fixture('credentials').then(credentials => {
                    loginPage.login(credentials.email, credentials.password);
                }
            );
            loginPage.validateErrorLogin();
        }
    );


    it('login exitoso con fixtures', () => {
            loginPage.validatePageLogin();

            cy.fixture('usuarios').then(credentials => {
                    loginPage.login(credentials.email, credentials.password);
                }
            );
            loginPage.validateErrorLogin();
        }
    );
})


//usando dos fixtures
const credentialsForUsers = [
    {
        nombre: "credentials",
        titulo: "Login con credentials",
    },
    {
        nombre: "users",
        titulo: "Login con users",
    }
]

credentialsForUsers.forEach(credentials => {
        describe.only(credentials.titulo, () => {
                beforeEach(() => {
                        loginPage.visit();
                    }
                );

                it('login exitoso con fixtures', () => {
                        loginPage.validatePageLogin();

                        cy.fixture(credentials.nombre).then(credentials => {
                                loginPage.login(credentials.email, credentials.password);
                            }
                        );
                        loginPage.validateErrorLogin();
                    }
                );
            }
        );
    }
);
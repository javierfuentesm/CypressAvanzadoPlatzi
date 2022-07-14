import { loginPage } from "../pageObjects/LoginPage";

describe("login con page object", () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it("login erroneo", () => {
    loginPage.validatePageLogin();
    loginPage.login("username111", "password111");
    loginPage.validateErrorLogin();
  });

  it("login exitoso", () => {
    loginPage.validatePageLogin();
    loginPage.login("username", "password");
    loginPage.validateSuccessLogin();
  });
});

const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const { loginPage } = require("../../../pageObjects/LoginPage");

Given(/^I am on the home page$/, function () {
  loginPage.validateSuccessLogin();
});

When(/^I click on the Account Activity Nav$/, function () {
  //reto que lo pases a un page page object
  cy.contains("Account Activity").click();
});

Then(/^I should see theAccount Activity content$/, function () {
  cy.contains("Show Transactions").should("be.visible");
});

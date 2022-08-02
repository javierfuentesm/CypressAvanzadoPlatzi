const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const { loginPage } = require("../../pageObjects/LoginPage");

Given(/^I am on the login page$/, function () {
  loginPage.visit();

  loginPage.validatePageLogin();
});

Then(/^I should validate that I am logged in$/, function () {
  loginPage.validateSuccessLogin();
});

When(
  /^I fill in my email and password with "([^"]*)" and "([^"]*)"$/,
  function (username, password) {
    loginPage.login(username, password);
  }
);

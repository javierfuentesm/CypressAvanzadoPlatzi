Feature: Login


  Scenario: Login with valid credentials
    Given I am on the login page
    When I fill in my email and password with "username" and "password"
    Then I should validate that I am logged in
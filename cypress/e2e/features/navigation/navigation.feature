Feature: NavigationBar

#  esto va a fallar porque no esta en shared steps teneos que mover login.js en shared steps
  Background:
    Given I am on the login page
    And I fill in my email and password with "username" and "password"


  Scenario: Navigate to the Feature Navigation Bar
    Given I am on the home page
    When I click on the Account Activity Nav
    Then I should see theAccount Activity content
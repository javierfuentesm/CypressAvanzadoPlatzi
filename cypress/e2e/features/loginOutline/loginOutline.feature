Feature: Login Outline


  Scenario Outline: Login with invalid credentials
    Given I am on the login page
    When I fill in my email and password with <user> and <pass>
    Then I should validate that I am not logged in
    Examples:
      | user      | pass      |
      | username3 | passwor3  |
      | username2 | password3 |
      | username3 | passsord3 |
      | userna4e3 | pa4ssord3 |

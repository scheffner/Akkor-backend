Feature: User Authentication

    Scenario Outline: User is able to login with valid credentials
    Given User navigates to the application
    When User click on the login button
    Then User enter the username "<username>" and password "<password>"
    And User click on the login button

    Examples:
    | username   | password |
    | pl         | azerty   |
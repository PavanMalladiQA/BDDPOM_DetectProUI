Feature: Detect Pro Application Launch and Login

As a valid S360 user
I want to login to the Detect Pro application
So that I can access the application and view the instrument data

  Scenario Outline: Login with valid credentials
    Given the user navigates to URL
    When the user enters a valid username "<username>" and password "<password>"
    And clicks the login button
    Then the user should be successfully navigated to Landing Page

    Examples:
      | username       | password      |
      | qadataautotest | Autotest@123  |


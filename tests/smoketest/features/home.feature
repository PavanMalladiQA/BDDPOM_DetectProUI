Feature: Smoke Test - Detect Pro Home Screen

  As a logged-in user
  I want to verify key elements and navigation on the Detect Pro home screen
  So that I can confirm the application is functional after login

  Background:
    Given the user is on the Detect Pro home screen

  Scenario: Home screen loads with key UI elements
    Then the Instrument counts should be displayed in the banner
    And the Home Page left navigation menu should be visible
    And the left navigation menu should contain:
      | item               |
      | Home               |
      | Substation Filters |
      | App suite          |
      | Circuit Condition  |
      | Substation Search  |
      | Settings           |
      | Logout             |
    And the view toggles should be visible:
      | view  |
      | Map   |
      | Grid  |
      | Table |
    And the "Clear Filters" option should be visible
    And the "Sort results by" option should not be visible on Map view
    And the "Last updated" timestamp should be displayed
    And the "Refresh" button should be visible
    And the "Download Substation CSV" button should be visible

    When I switch to Grid view
    Then the "Sort results by" option should be visible

    When I switch to Table view
    Then the "Sort results by" option should be visible

  Scenario: Substation Filters panel contains expected sections
    When the user clicks on the Substation Filters icon
    Then the Substation Filters panel should be visible on the left side
    And the Substation Type filter chips should be displayed:
      | chip          |
      | Ground Mounted|
      | Pole Mounted  |
    And the License Area filter should be displayed and clickable
    And the District filter should be displayed and disabled by default
    And the Instrument Filters section should be displayed
    And the Instrument Search filter should be displayed
    And the Instrument Installed filter chips should be displayed:
      | chip |
      | Yes  |
      | No   |
    And the Instrument Type filter should contain:
      | option     |
      | VisNet Hub |
      | VisNet View|
      | Guard      |
      | Reclose1   |
      | Reclose2   |
    And the Offline instruments filter chips should be displayed:
      | chip |
      | Yes  |
      | No   |

  Scenario: Substation cards display key information and actions
    Then the substation list should be loaded in grid view
    And each substation card should display key fields
    And the "Quick view" button should be available on each substation card
    And the "Explore" button should be available on each substation card

  Scenario: Switch between Map and Table views
    When the user clicks on the Map view icon
    Then the map view canvas should be displayed
    When the user clicks on the Table view icon
    Then the table view canvas should be displayed

  Scenario: Verify panels and navigation
    When the user clicks on "App suite" in the left navigation menu
    Then the App suite panel should be visible
    And the "Alarm CSV" App suite option should be visible
    And the "Alarm CSV" button should be visible
    When the user clicks on "Circuit Condition" in the left navigation menu
    Then the Circuit Condition panel should be visible

  Scenario: Quick view and Explore actions
    When I switch to Grid view
    When the user clicks on the "Quick view" button on the substation under test
    Then the Quick view panel should be displayed
    When the user clicks on the "Explore" button in quick view
    Then the user should be navigated to the Substation details page

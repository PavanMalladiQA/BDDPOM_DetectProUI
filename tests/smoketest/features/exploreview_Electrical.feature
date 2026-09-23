# Reference UI: attached Electrical Explore View screenshot
# Expected route: Substation Explore View > Electrical

Feature: Smoke Test - Detect Pro Explore View Electrical Tab

  As a logged-in user
  I want to verify the Electrical Tab for a selected substation
  So that I can confirm the filters, asset controls, chart state, and navigation are functional

  Background:
    Given the user is on Detect Pro Electrical Explore View for substation under test

  @smoke @electrical @navigation
  Scenario: Electrical Explore View loads with the expected shell
    Then the Electrical tab should be selected
    And the Chart Filters panel should be visible
    And the Electrical chart title should contain the selected substation and transformer
    And the Electrical chart should be visible

  @electrical @filters
  Scenario: Chart Filters panel displays the expected controls
    Then the Transformer dropdown should be visible
    And the Instrument dropdown should be visible
    And the Time Period dropdown should be visible
    And the Asset section should be visible
    And the Data Point Type section should be visible
    And the Phase section should be visible

  @electrical @filters
  Scenario: Transformer dropdown can be opened and contains available transformers
    When the user opens the Transformer dropdown
    Then the Transformer dropdown options should be visible
    And the Transformer dropdown should contain the selected transformer
    When the user selects the first transformer
    Then the selected transformer should be displayed in the Transformer dropdown

  @electrical @filters
  Scenario: Instrument dropdown can be opened and an instrument can be selected
    When the user opens the Instrument dropdown
    Then the Instrument dropdown options should be visible
    When the user selects an available instrument
    Then the selected instrument should be displayed in the Instrument dropdown
    And the Electrical chart should refresh for the selected instrument

  @electrical @filters
  Scenario Outline: Time Period dropdown contains supported options
    When the user opens the Time Period dropdown
    Then the Time Period dropdown should contain "<option>"

    Examples:
      | option         |
      | Last 24 hours  |
      | Last 7 days    |
      | Last 30 days   |
      | Last 90 days   |
      | Single Day     |
      | Date Range     |

  @electrical @filters
  Scenario Outline: Selecting a time period refreshes the Electrical chart
    When the user selects Time Period "<option>"
    Then Time Period "<option>" should be displayed as selected
    And the Electrical chart should refresh

    Examples:
      | option        |
      | Last 24 hours |
      | Last 7 days   |
      | Last 30 days  |
      | Last 90 days  |

  @electrical @chart
  Scenario: Electrical chart displays an empty-data state when no readings exist
    Then the Electrical chart should remain visible
    And the chart should display "No data to display" when no readings exist
    And the chart should not display a broken component error

  @electrical @navigation
  Scenario: User can return to the Substation Overview tab
    When the user selects the "Substation Overview" tab
    Then the Substation Overview tab should be selected
    And the Substation Overview screen should load successfully

  @electrical @navigation
  Scenario: User can use the Home breadcrumb
    When the user selects the Home breadcrumb
    Then the Detect Pro Home screen should be displayed
    And the Home view options should be visible

  @electrical @footer
  Scenario Outline: Electrical view footer links are available
    Then the footer link "<link>" should be visible
    And the footer link "<link>" should be enabled

    Examples:
      | link            |
      | Commissioning   |
      | Feedback        |
      | Contact Support |

  @electrical @navigation   
  Scenario Outline: Electrical view Screen Left Navigation
  Then the Electrical view left navigation menu should be visible
  And the Electrical view left navigation menu should contain "<item>" with associated "<states>"

    Examples:
    | item              | states                  |
    | Home              | visible, clickable      |
    | Chart Filters     | visible, clickable      |
    | App Suite         | Disabled, not clickable |
    | Circuit Condition | Disabled, not clickable |
    | Substation Search | visible, clickable      |
    | Settings          | visible, clickable      |
    | Logout            | visible, clickable      |

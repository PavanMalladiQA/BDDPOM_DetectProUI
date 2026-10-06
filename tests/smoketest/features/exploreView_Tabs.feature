@smoke @explore-view @navigation
Feature: Validate tabs in Substation Explore view

  As a user of the Substation application
  I want to navigate through all available Explore view tabs
  So that I can verify that each tab opens the expected substation view

  Background:
    Given the user is on Detect Pro Substation Overview screen for substation under test

  Scenario Outline: Verify navigation to each Substation Explore view tab
    When the user selects the "<Tab>" tab
    Then the "<Tab>" tab should be displayed as selected
    And the user should be navigated to the "<Expected View>" view
    And a screenshot should be captured showing the selected "<Tab>" tab

    Examples:
      | Tab                 | Expected View        |
      | Substation Overview | Substation Overview  |
      | Electrical          | Electrical           |
      | Power Quality       | Power Quality        |
      | Fault Overview      | Fault Overview       |
      | Events              | Events               |
      | Event Trending      | Event Trending       |
      | Environmental       | Environmental        |
      | Instruments         | Instruments          |
      | Load Duration       | Load Duration        |
      | Neutral Anomaly     | Neutral Anomaly      |
      | Battery Management  | Battery Management   |
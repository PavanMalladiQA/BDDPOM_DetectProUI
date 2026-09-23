Feature: Smoke Test - Detect Pro Substation Explore Views

  As a logged-in user
  I want to verify key elements and navigation on the Detect Substation Explore Views
  So that I can confirm the Substation Explore Views are functional after exploring the substations

  Background:
  Given the user is on Detect Pro Substation Overview screen for substation under test 

  Scenario Outline: Substation Overview Screen Left Navigation
  Then the Substation Overview left navigation menu should be visible
  And the Substation Overview left navigation menu should contain "<item>" with associated "<states>"

Examples:
  | item              | states                  |
  | Home              | visible, clickable      |
  | Chart Filters     | visible, clickable      |
  | App Suite         | Disabled, not clickable |
  | Circuit Condition | Disabled, not clickable |
  | Substation Search | visible, clickable      |
  | Settings          | visible, clickable      |
  | Logout            | visible, clickable      |

  Scenario Outline: Scenario Outline name: Substation Overview screen Fault Filters component
    Then the Substation Overview screen should load successfully
    When the Chart Filters icon selected
    Then the Fault Filters panel should be visible
    And Instrument Dropdown field should be visible provided selected substation has multiple instruments
    And the Instrument Dropdown should be clickable
    And the Fault Filters should contain Time Period filter with "<options>"

    Examples:
      | options       |
      | Last 24 hours |
      | Last 7 days   |
      | Last 30 days  |
      | Last 90 days  |
      | Single Day    |
      | Date Range    |

    Scenario: Substation Overview screen Substation Details
    Then the data slot for Substation should be visible
    When user expands the Substation data slot
    Then the following section headers should be displayed:
      | section headers         |
      | Substation Details      |
      | Region                  |
      | GPS Coordinates         |
      | Address                 |
    And user should be able to collapse the Substation data slot
    When user expands Substation Notes and Images data slot
    Then the following section headers for notes and images should be displayed:
      | section headers         |
      | Substation Images       |
      | Substation Notes        |  
    And user should be able to collapse the Substation Notes and Images data slot
    When user expands Transformer data slot
    Then the following sections should be displayed:
      | sections                |
      | Transformer Details     |
      | L1 Phase                |
      | L2 Phase                |
      | L3 Phase                |
      | N Phase                 |  
    And user should be able to collapse the Transformer data slot

    
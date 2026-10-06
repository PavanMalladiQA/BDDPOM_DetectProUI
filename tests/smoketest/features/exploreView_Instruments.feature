@smoke @explore-view @instruments
Feature: Validate instruments in Substation Explore view

  As a user of the Substation application
  I want to inspect each instrument in the Instruments tab
  So that I can verify its details and graph components

  Background:
    Given the user is on Detect Pro Substation Overview screen for substation under test
    When the user selects the "Instruments" tab
    Then the Instruments view should be displayed

  @navigation
  Scenario Outline: Instruments view Screen Left Navigation
    Then the Instruments view left navigation menu should be visible
    And the Instruments view left navigation menu should contain "<item>" with associated "<states>"

    Examples:
      | item              | states                  |
      | Home              | visible, clickable      |
      | Chart Filters     | Disabled, not clickable |
      | App Suite         | Disabled, not clickable |
      | Circuit Condition | Disabled, not clickable |
      | Substation Search | visible, clickable      |
      | Settings          | visible, clickable      |
      | Logout            | visible, clickable      |

  @visnet-hub
  Scenario: VisNet Hub details and graphs are displayed
    When the user selects the "VisNet Hub" instrument from the Instruments list
    Then the "VisNet Hub" Instrument Overview should contain these fields:
      | field              |
      | Instrument          |
      | Device Status       |
      | Last Updated        |
      | Last Seen           |
      | Serial Number       |
      | Instrument ID       |
      | Antenna Connected   |
      | Version             |
    And the "VisNet Hub Details" section should contain these fields:
      | field              |
      | MAC Address         |
      | SIM Serial          |
      | IP Address          |
      | Fuse Stalk Extender |
    And the Instruments view should display these graph components:
      | graph           |
      | Signal Strength |

  @visnet-view
  Scenario: VisNet View details and graphs are displayed
    When the user selects the "VisNet View" instrument from the Instruments list
    Then the "VisNet View" Instrument Overview should contain these fields:
      | field            |
      | Instrument        |
      | Device Status     |
      | Last Updated      |
      | Last Seen         |
      | Serial Number     |
      | Instrument ID     |
      | Antenna Connected |
      | Version           |
    And the "VisNet View Details" section should contain these fields:
      | field       |
      | SIM Serial  |
      | IP Address  |
    And the Instruments view should display these graph components:
      | graph                  |
      | Signal Quality         |
      | Internal Battery Voltage |

  @guard
  Scenario: Guard details and graphs are displayed
    When the user selects the "Guard" instrument from the Instruments list
    Then the "Guard" Instrument Overview should contain these fields:
      | field            |
      | Instrument        |
      | Device Status     |
      | Last Updated      |
      | Last Seen         |
      | Serial Number     |
      | Instrument ID     |
      | Antenna Connected |
      | Version           |
    And the "Voltage Probe Settings" section should contain these fields:
      | field          |
      | Voltage Probe  |
      | Connection Probe |
      | Phase          |
    And the "Current Probe Settings" section should contain these fields:
      | field          |
      | Current Probe  |
      | Connection Probe |
      | Phase          |
    And the Instruments view should display these graph components:
      | graph           |
      | Signal Strength |

  @reclose2
  Scenario: Reclose2 details and graphs are displayed
    When the user selects the "Reclose2 1.1" instrument from the Instruments list
    Then the "Reclose2 1.1" Instrument Overview should contain these fields:
      | field            |
      | Instrument        |
      | Device Status     |
      | Last Updated     |
      | Last Seen        |
      | Serial Number    |
      | Instrument ID    |
      | Antenna Connected |
    And the "Reclose Details" section should contain these fields:
      | field                   |
      | Modbus Address          |
      | Uptime                  |
      | Setup Address           |
      | Fuse Rating             |
      | Total Device Operations |
      | Total Open Operations   |
      | Switch State            |
      | Switch Temperature      |
      | Busbar Voltage          |
      | Cable Voltage           |
      | Current RMS             |
    And the Instruments view should display these graph components:
      | graph             |
      | Switch Temperature |


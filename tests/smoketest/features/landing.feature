Feature: Detect Pro Landing Page Load and Customer Selection 

As a user of Detect Pro 
I want to access the landing page and select a customer 
So that I can begin using the application functionalities 

Background: 
Given the user navigates to the Detect Pro landing page 

Scenario: Verify the customer dropdown in the banner 
Then the customer dropdown should be visible in the banner
And the dropdown should be clickable  

Scenario: Verify the customer dropdown in the middle of the Landing page 
Then the customer dropdown should be visible in the middle of the page 
And the message "No customer selected" should be shown 

Scenario: Verify Commissioning link is available and functional
  Then the "Commissioning" link should be visible
  When the user clicks on the "Commissioning" link
  Then the UI control to navigate to new page with commissioning UI login page should be presented

Scenario: Verify Feedback link is available and functional
  And the "Feedback" link should be visible
  When the user clicks on the "Feedback" link
  Then the Submit Feedback popup should be presented as expected

Scenario: Verify Contact Support link is available and functional
  And the "Contact Support" link should be visible
  When the user clicks on the "Contact Support" link
  Then the "Got a question or need help?" Contact card should be presented

Scenario Outline: Validate different customer if present in the combo box in the banner 
When the user clicks banner customer dropdown 
Then the application should display "<CustomerName>" in the dropdown 

Examples:
  | CustomerName                 |
  | EA Technology Manufacturer   |
  | Northern Powergrid           |
  | SPEN                         |
  | SSEN                         |
  | UKPN                         |

Scenario: Verify that the user can select a customer 
When the user clicks on the customer dropdown 
And selects a customer from the list 
Then the selected customer should be displayed in the dropdown 
And the application should load the Home page for the selected customer
Feature: Detect Pro Landing Page Load and Customer Selection 

As a user of Detect Pro 
I want to access the landing page and select a customer 
So that I can begin using the application functionalities 

Background: 
Given the user navigates to the Detect Pro landing page 

Scenario: Verify the customer dropdown in the banner 
Then the customer dropdown should be visible in the banner 
And the customer selection dropdown should be clickable 

Scenario: Verify the customer dropdown in the middle of the Landing page 
Then the customer dropdown should be visible in the middle of the page 
And the message "No customer selected" should be shown 
And the customer selection dropdown should be clickable 

Scenario: Verify that the user can select a customer 
When the user clicks on the customer dropdown 
And selects a customer from the list 
Then the selected customer should be displayed in the dropdown 

Scenario Outline: Verify support links are available and functional 
And the "<LinkText>" link should be visible 
When the user clicks on the <LinkText> link 
Then the <ExpectedOutcome> should be presented 

Examples: 

    | LinkText         | ExpectedOutcome                                           | 
    | Commissioning    | UI control to navigate to new page with commissioning UI login page | 
    | Feedback         | Submit Feedback popup to be presented as expected         | 
    | Contact Support  | "Got a question or need help?" Contact card to be presented | 

Scenario Outline: Validate different customer selections 
When the user selects "<CustomerName>" from the dropdown 
Then the application should launch Home page with "<CustomerName>" displayed in the banner 

Examples: 

      | CustomerName     | 
      | National Grid    | 
      | Scottish Power   | 
      | Western Power    | 
      | SSE              | 
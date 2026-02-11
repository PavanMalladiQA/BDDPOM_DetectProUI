// Generated from: tests\smoketest\features\landing.feature
import { test } from "playwright-bdd";

test.describe('Detect Pro Landing Page Load and Customer Selection', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('the user navigates to the Detect Pro landing page', null, { page }); 
  });
  
  test('Verify the customer dropdown in the banner', async ({ Then, And }) => { 
    await Then('the customer dropdown should be visible in the banner'); 
    await And('the dropdown should be clickable'); 
  });

  test('Verify the customer dropdown in the middle of the Landing page', async ({ Then, And }) => { 
    await Then('the customer dropdown should be visible in the middle of the page'); 
    await And('the message "No customer selected" should be shown'); 
  });

  test('Verify Commissioning link is available and functional', async ({ When, Then }) => { 
    await Then('the "Commissioning" link should be visible'); 
    await When('the user clicks on the "Commissioning" link'); 
    await Then('the UI control to navigate to new page with commissioning UI login page should be presented'); 
  });

  test('Verify Feedback link is available and functional', async ({ When, Then, And }) => { 
    await And('the "Feedback" link should be visible'); 
    await When('the user clicks on the "Feedback" link'); 
    await Then('the Submit Feedback popup should be presented as expected'); 
  });

  test('Verify Contact Support link is available and functional', async ({ When, Then, And }) => { 
    await And('the "Contact Support" link should be visible'); 
    await When('the user clicks on the "Contact Support" link'); 
    await Then('the "Got a question or need help?" Contact card should be presented'); 
  });

  test.describe('Validate different customer if present in the combo box in the banner', () => {

    test('Example #1', async ({ When, Then }) => { 
      await When('the user clicks banner customer dropdown'); 
      await Then('the application should display "EA Technology Manufacturer" in the dropdown'); 
    });

    test('Example #2', async ({ When, Then }) => { 
      await When('the user clicks banner customer dropdown'); 
      await Then('the application should display "Northern Powergrid" in the dropdown'); 
    });

    test('Example #3', async ({ When, Then }) => { 
      await When('the user clicks banner customer dropdown'); 
      await Then('the application should display "SPEN" in the dropdown'); 
    });

    test('Example #4', async ({ When, Then }) => { 
      await When('the user clicks banner customer dropdown'); 
      await Then('the application should display "SSEN" in the dropdown'); 
    });

    test('Example #5', async ({ When, Then }) => { 
      await When('the user clicks banner customer dropdown'); 
      await Then('the application should display "UKPN" in the dropdown'); 
    });

  });

  test('Verify that the user can select a customer', async ({ When, Then, And }) => { 
    await When('the user clicks on the customer dropdown'); 
    await And('selects a customer from the list'); 
    await Then('the selected customer should be displayed in the dropdown'); 
    await And('the application should load the Home page for the selected customer'); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, page }) => $runScenarioHooks('before', { page }));
test.afterEach('AfterEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('after', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\smoketest\\features\\landing.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user navigates to the Detect Pro landing page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the customer dropdown should be visible in the banner","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And the dropdown should be clickable","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":14,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user navigates to the Detect Pro landing page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then the customer dropdown should be visible in the middle of the page","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And the message \"No customer selected\" should be shown","stepMatchArguments":[]}]},
  {"pwTestLine":20,"pickleLine":18,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user navigates to the Detect Pro landing page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the \"Commissioning\" link should be visible","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"When the user clicks on the \"Commissioning\" link","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then the UI control to navigate to new page with commissioning UI login page should be presented","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":23,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user navigates to the Detect Pro landing page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":24,"keywordType":"Context","textWithKeyword":"And the \"Feedback\" link should be visible","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"When the user clicks on the \"Feedback\" link","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then the Submit Feedback popup should be presented as expected","stepMatchArguments":[]}]},
  {"pwTestLine":32,"pickleLine":28,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user navigates to the Detect Pro landing page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"And the \"Contact Support\" link should be visible","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When the user clicks on the \"Contact Support\" link","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"Then the \"Got a question or need help?\" Contact card should be presented","stepMatchArguments":[]}]},
  {"pwTestLine":40,"pickleLine":39,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user navigates to the Detect Pro landing page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When the user clicks banner customer dropdown","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then the application should display \"EA Technology Manufacturer\" in the dropdown","stepMatchArguments":[{"group":{"start":31,"value":"\"EA Technology Manufacturer\"","children":[{"start":32,"value":"EA Technology Manufacturer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":45,"pickleLine":40,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user navigates to the Detect Pro landing page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When the user clicks banner customer dropdown","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then the application should display \"Northern Powergrid\" in the dropdown","stepMatchArguments":[{"group":{"start":31,"value":"\"Northern Powergrid\"","children":[{"start":32,"value":"Northern Powergrid","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":50,"pickleLine":41,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user navigates to the Detect Pro landing page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When the user clicks banner customer dropdown","stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then the application should display \"SPEN\" in the dropdown","stepMatchArguments":[{"group":{"start":31,"value":"\"SPEN\"","children":[{"start":32,"value":"SPEN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":55,"pickleLine":42,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user navigates to the Detect Pro landing page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When the user clicks banner customer dropdown","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then the application should display \"SSEN\" in the dropdown","stepMatchArguments":[{"group":{"start":31,"value":"\"SSEN\"","children":[{"start":32,"value":"SSEN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":60,"pickleLine":43,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user navigates to the Detect Pro landing page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When the user clicks banner customer dropdown","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then the application should display \"UKPN\" in the dropdown","stepMatchArguments":[{"group":{"start":31,"value":"\"UKPN\"","children":[{"start":32,"value":"UKPN","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":67,"pickleLine":45,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user navigates to the Detect Pro landing page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":68,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"When the user clicks on the customer dropdown","stepMatchArguments":[]},{"pwStepLine":69,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"And selects a customer from the list","stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then the selected customer should be displayed in the dropdown","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"And the application should load the Home page for the selected customer","stepMatchArguments":[]}]},
]; // bdd-data-end
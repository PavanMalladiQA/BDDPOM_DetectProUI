// Generated from: tests\smoketest\features\exploreView_Electrical.feature
import { test } from "playwright-bdd";

test.describe('Smoke Test - Detect Pro Explore View Electrical Tab', () => {

  test.beforeEach('Background', async ({ Given }, testInfo) => { if (testInfo.error) return;
    await Given('the user is on Detect Pro Electrical Explore View for substation under test'); 
  });
  
  test('Electrical Explore View loads with the expected shell', { tag: ['@smoke', '@electrical', '@navigation'] }, async ({ Then, And }) => { 
    await Then('the Electrical tab should be selected'); 
    await And('the Chart Filters panel should be visible'); 
    await And('the Electrical chart title should contain the selected substation and transformer'); 
    await And('the Electrical chart should be visible'); 
  });

  test('Chart Filters panel displays the expected controls', { tag: ['@electrical', '@filters'] }, async ({ Then, And }) => { 
    await Then('the Transformer dropdown should be visible'); 
    await And('the Instrument dropdown should be visible'); 
    await And('the Time Period dropdown should be visible'); 
    await And('the Asset section should be visible'); 
    await And('the Data Point Type section should be visible'); 
    await And('the Phase section should be visible'); 
  });

  test('Transformer dropdown can be opened and contains available transformers', { tag: ['@electrical', '@filters'] }, async ({ When, Then, And }) => { 
    await When('the user opens the Transformer dropdown'); 
    await Then('the Transformer dropdown options should be visible'); 
    await And('the Transformer dropdown should contain the selected transformer'); 
    await When('the user selects the first transformer'); 
    await Then('the selected transformer should be displayed in the Transformer dropdown'); 
  });

  test('Instrument dropdown can be opened and an instrument can be selected', { tag: ['@electrical', '@filters'] }, async ({ When, Then, And }) => { 
    await When('the user opens the Instrument dropdown'); 
    await Then('the Instrument dropdown options should be visible'); 
    await When('the user selects an available instrument'); 
    await Then('the selected instrument should be displayed in the Instrument dropdown'); 
    await And('the Electrical chart should refresh for the selected instrument'); 
  });

  test.describe('Time Period dropdown contains supported options', () => {

    test('Example #1', { tag: ['@electrical', '@filters'] }, async ({ When, Then }) => { 
      await When('the user opens the Time Period dropdown'); 
      await Then('the Time Period dropdown should contain "Last 24 hours"'); 
    });

    test('Example #2', { tag: ['@electrical', '@filters'] }, async ({ When, Then }) => { 
      await When('the user opens the Time Period dropdown'); 
      await Then('the Time Period dropdown should contain "Last 7 days"'); 
    });

    test('Example #3', { tag: ['@electrical', '@filters'] }, async ({ When, Then }) => { 
      await When('the user opens the Time Period dropdown'); 
      await Then('the Time Period dropdown should contain "Last 30 days"'); 
    });

    test('Example #4', { tag: ['@electrical', '@filters'] }, async ({ When, Then }) => { 
      await When('the user opens the Time Period dropdown'); 
      await Then('the Time Period dropdown should contain "Last 90 days"'); 
    });

    test('Example #5', { tag: ['@electrical', '@filters'] }, async ({ When, Then }) => { 
      await When('the user opens the Time Period dropdown'); 
      await Then('the Time Period dropdown should contain "Single Day"'); 
    });

    test('Example #6', { tag: ['@electrical', '@filters'] }, async ({ When, Then }) => { 
      await When('the user opens the Time Period dropdown'); 
      await Then('the Time Period dropdown should contain "Date Range"'); 
    });

  });

  test.describe('Selecting a time period refreshes the Electrical chart', () => {

    test('Example #1', { tag: ['@electrical', '@filters'] }, async ({ When, Then, And }) => { 
      await When('the user selects Time Period "Last 24 hours"'); 
      await Then('Time Period "Last 24 hours" should be displayed as selected'); 
      await And('the Electrical chart should refresh'); 
    });

    test('Example #2', { tag: ['@electrical', '@filters'] }, async ({ When, Then, And }) => { 
      await When('the user selects Time Period "Last 7 days"'); 
      await Then('Time Period "Last 7 days" should be displayed as selected'); 
      await And('the Electrical chart should refresh'); 
    });

    test('Example #3', { tag: ['@electrical', '@filters'] }, async ({ When, Then, And }) => { 
      await When('the user selects Time Period "Last 30 days"'); 
      await Then('Time Period "Last 30 days" should be displayed as selected'); 
      await And('the Electrical chart should refresh'); 
    });

    test('Example #4', { tag: ['@electrical', '@filters'] }, async ({ When, Then, And }) => { 
      await When('the user selects Time Period "Last 90 days"'); 
      await Then('Time Period "Last 90 days" should be displayed as selected'); 
      await And('the Electrical chart should refresh'); 
    });

  });

  test('Electrical chart displays an empty-data state when no readings exist', { tag: ['@electrical', '@chart'] }, async ({ Then, And }) => { 
    await Then('the Electrical chart should remain visible'); 
    await And('the chart should display "No data to display" when no readings exist'); 
    await And('the chart should not display a broken component error'); 
  });

  test('User can return to the Substation Overview tab', { tag: ['@electrical', '@navigation'] }, async ({ When, Then, And, page }) => { 
    await When('the user selects the "Substation Overview" tab', null, { page }); 
    await Then('the Substation Overview tab should be selected'); 
    await And('the Substation Overview screen should load successfully'); 
  });

  test('User can use the Home breadcrumb', { tag: ['@electrical', '@navigation'] }, async ({ When, Then, And }) => { 
    await When('the user selects the Home breadcrumb'); 
    await Then('the Detect Pro Home screen should be displayed'); 
    await And('the Home view options should be visible'); 
  });

  test.describe('Electrical view footer links are available', () => {

    test('Example #1', { tag: ['@electrical', '@footer'] }, async ({ Then, And }) => { 
      await Then('the footer link "Commissioning" should be visible'); 
      await And('the footer link "Commissioning" should be enabled'); 
    });

    test('Example #2', { tag: ['@electrical', '@footer'] }, async ({ Then, And }) => { 
      await Then('the footer link "Feedback" should be visible'); 
      await And('the footer link "Feedback" should be enabled'); 
    });

    test('Example #3', { tag: ['@electrical', '@footer'] }, async ({ Then, And }) => { 
      await Then('the footer link "Contact Support" should be visible'); 
      await And('the footer link "Contact Support" should be enabled'); 
    });

  });

  test.describe('Electrical view Screen Left Navigation', () => {

    test('Example #1', { tag: ['@electrical', '@navigation'] }, async ({ Then, And }) => { 
      await Then('the Electrical view left navigation menu should be visible'); 
      await And('the Electrical view left navigation menu should contain "Home" with associated "visible, clickable"'); 
    });

    test('Example #2', { tag: ['@electrical', '@navigation'] }, async ({ Then, And }) => { 
      await Then('the Electrical view left navigation menu should be visible'); 
      await And('the Electrical view left navigation menu should contain "Chart Filters" with associated "visible, clickable"'); 
    });

    test('Example #3', { tag: ['@electrical', '@navigation'] }, async ({ Then, And }) => { 
      await Then('the Electrical view left navigation menu should be visible'); 
      await And('the Electrical view left navigation menu should contain "App Suite" with associated "Disabled, not clickable"'); 
    });

    test('Example #4', { tag: ['@electrical', '@navigation'] }, async ({ Then, And }) => { 
      await Then('the Electrical view left navigation menu should be visible'); 
      await And('the Electrical view left navigation menu should contain "Circuit Condition" with associated "Disabled, not clickable"'); 
    });

    test('Example #5', { tag: ['@electrical', '@navigation'] }, async ({ Then, And }) => { 
      await Then('the Electrical view left navigation menu should be visible'); 
      await And('the Electrical view left navigation menu should contain "Substation Search" with associated "visible, clickable"'); 
    });

    test('Example #6', { tag: ['@electrical', '@navigation'] }, async ({ Then, And }) => { 
      await Then('the Electrical view left navigation menu should be visible'); 
      await And('the Electrical view left navigation menu should contain "Settings" with associated "visible, clickable"'); 
    });

    test('Example #7', { tag: ['@electrical', '@navigation'] }, async ({ Then, And }) => { 
      await Then('the Electrical view left navigation menu should be visible'); 
      await And('the Electrical view left navigation menu should contain "Logout" with associated "visible, clickable"'); 
    });

  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, page }) => $runScenarioHooks('before', { page }));
test.afterEach('AfterEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('after', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\smoketest\\features\\exploreView_Electrical.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":14,"tags":["@smoke","@electrical","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"Then the Electrical tab should be selected","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"And the Chart Filters panel should be visible","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And the Electrical chart title should contain the selected substation and transformer","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":18,"keywordType":"Outcome","textWithKeyword":"And the Electrical chart should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":17,"pickleLine":21,"tags":["@electrical","@filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"Then the Transformer dropdown should be visible","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the Instrument dropdown should be visible","stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And the Time Period dropdown should be visible","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"And the Asset section should be visible","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"And the Data Point Type section should be visible","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And the Phase section should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":30,"tags":["@electrical","@filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"When the user opens the Transformer dropdown","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then the Transformer dropdown options should be visible","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"And the Transformer dropdown should contain the selected transformer","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":34,"keywordType":"Action","textWithKeyword":"When the user selects the first transformer","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"Then the selected transformer should be displayed in the Transformer dropdown","stepMatchArguments":[]}]},
  {"pwTestLine":34,"pickleLine":38,"tags":["@electrical","@filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When the user opens the Instrument dropdown","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"Then the Instrument dropdown options should be visible","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"When the user selects an available instrument","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"Then the selected instrument should be displayed in the Instrument dropdown","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":43,"keywordType":"Outcome","textWithKeyword":"And the Electrical chart should refresh for the selected instrument","stepMatchArguments":[]}]},
  {"pwTestLine":44,"pickleLine":52,"tags":["@electrical","@filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When the user opens the Time Period dropdown","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then the Time Period dropdown should contain \"Last 24 hours\"","stepMatchArguments":[{"group":{"start":40,"value":"\"Last 24 hours\"","children":[{"start":41,"value":"Last 24 hours","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":49,"pickleLine":53,"tags":["@electrical","@filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When the user opens the Time Period dropdown","stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then the Time Period dropdown should contain \"Last 7 days\"","stepMatchArguments":[{"group":{"start":40,"value":"\"Last 7 days\"","children":[{"start":41,"value":"Last 7 days","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":54,"pickleLine":54,"tags":["@electrical","@filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When the user opens the Time Period dropdown","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then the Time Period dropdown should contain \"Last 30 days\"","stepMatchArguments":[{"group":{"start":40,"value":"\"Last 30 days\"","children":[{"start":41,"value":"Last 30 days","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":59,"pickleLine":55,"tags":["@electrical","@filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":60,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When the user opens the Time Period dropdown","stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then the Time Period dropdown should contain \"Last 90 days\"","stepMatchArguments":[{"group":{"start":40,"value":"\"Last 90 days\"","children":[{"start":41,"value":"Last 90 days","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":64,"pickleLine":56,"tags":["@electrical","@filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When the user opens the Time Period dropdown","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then the Time Period dropdown should contain \"Single Day\"","stepMatchArguments":[{"group":{"start":40,"value":"\"Single Day\"","children":[{"start":41,"value":"Single Day","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":69,"pickleLine":57,"tags":["@electrical","@filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When the user opens the Time Period dropdown","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"Then the Time Period dropdown should contain \"Date Range\"","stepMatchArguments":[{"group":{"start":40,"value":"\"Date Range\"","children":[{"start":41,"value":"Date Range","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":78,"pickleLine":67,"tags":["@electrical","@filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When the user selects Time Period \"Last 24 hours\"","stepMatchArguments":[{"group":{"start":29,"value":"\"Last 24 hours\"","children":[{"start":30,"value":"Last 24 hours","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":80,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"Then Time Period \"Last 24 hours\" should be displayed as selected","stepMatchArguments":[{"group":{"start":12,"value":"\"Last 24 hours\"","children":[{"start":13,"value":"Last 24 hours","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":81,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"And the Electrical chart should refresh","stepMatchArguments":[]}]},
  {"pwTestLine":84,"pickleLine":68,"tags":["@electrical","@filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":85,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When the user selects Time Period \"Last 7 days\"","stepMatchArguments":[{"group":{"start":29,"value":"\"Last 7 days\"","children":[{"start":30,"value":"Last 7 days","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":86,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"Then Time Period \"Last 7 days\" should be displayed as selected","stepMatchArguments":[{"group":{"start":12,"value":"\"Last 7 days\"","children":[{"start":13,"value":"Last 7 days","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":87,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"And the Electrical chart should refresh","stepMatchArguments":[]}]},
  {"pwTestLine":90,"pickleLine":69,"tags":["@electrical","@filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":91,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When the user selects Time Period \"Last 30 days\"","stepMatchArguments":[{"group":{"start":29,"value":"\"Last 30 days\"","children":[{"start":30,"value":"Last 30 days","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":92,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"Then Time Period \"Last 30 days\" should be displayed as selected","stepMatchArguments":[{"group":{"start":12,"value":"\"Last 30 days\"","children":[{"start":13,"value":"Last 30 days","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":93,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"And the Electrical chart should refresh","stepMatchArguments":[]}]},
  {"pwTestLine":96,"pickleLine":70,"tags":["@electrical","@filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"When the user selects Time Period \"Last 90 days\"","stepMatchArguments":[{"group":{"start":29,"value":"\"Last 90 days\"","children":[{"start":30,"value":"Last 90 days","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":98,"gherkinStepLine":62,"keywordType":"Outcome","textWithKeyword":"Then Time Period \"Last 90 days\" should be displayed as selected","stepMatchArguments":[{"group":{"start":12,"value":"\"Last 90 days\"","children":[{"start":13,"value":"Last 90 days","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":99,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"And the Electrical chart should refresh","stepMatchArguments":[]}]},
  {"pwTestLine":104,"pickleLine":73,"tags":["@electrical","@chart"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":105,"gherkinStepLine":74,"keywordType":"Outcome","textWithKeyword":"Then the Electrical chart should remain visible","stepMatchArguments":[]},{"pwStepLine":106,"gherkinStepLine":75,"keywordType":"Outcome","textWithKeyword":"And the chart should display \"No data to display\" when no readings exist","stepMatchArguments":[{"group":{"start":25,"value":"\"No data to display\"","children":[{"start":26,"value":"No data to display","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":107,"gherkinStepLine":76,"keywordType":"Outcome","textWithKeyword":"And the chart should not display a broken component error","stepMatchArguments":[]}]},
  {"pwTestLine":110,"pickleLine":79,"tags":["@electrical","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":80,"keywordType":"Action","textWithKeyword":"When the user selects the \"Substation Overview\" tab","stepMatchArguments":[{"group":{"start":21,"value":"\"Substation Overview\"","children":[{"start":22,"value":"Substation Overview","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":112,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"Then the Substation Overview tab should be selected","stepMatchArguments":[]},{"pwStepLine":113,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"And the Substation Overview screen should load successfully","stepMatchArguments":[]}]},
  {"pwTestLine":116,"pickleLine":85,"tags":["@electrical","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":86,"keywordType":"Action","textWithKeyword":"When the user selects the Home breadcrumb","stepMatchArguments":[]},{"pwStepLine":118,"gherkinStepLine":87,"keywordType":"Outcome","textWithKeyword":"Then the Detect Pro Home screen should be displayed","stepMatchArguments":[]},{"pwStepLine":119,"gherkinStepLine":88,"keywordType":"Outcome","textWithKeyword":"And the Home view options should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":124,"pickleLine":97,"tags":["@electrical","@footer"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":125,"gherkinStepLine":92,"keywordType":"Outcome","textWithKeyword":"Then the footer link \"Commissioning\" should be visible","stepMatchArguments":[{"group":{"start":16,"value":"\"Commissioning\"","children":[{"start":17,"value":"Commissioning","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":126,"gherkinStepLine":93,"keywordType":"Outcome","textWithKeyword":"And the footer link \"Commissioning\" should be enabled","stepMatchArguments":[{"group":{"start":16,"value":"\"Commissioning\"","children":[{"start":17,"value":"Commissioning","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":129,"pickleLine":98,"tags":["@electrical","@footer"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":130,"gherkinStepLine":92,"keywordType":"Outcome","textWithKeyword":"Then the footer link \"Feedback\" should be visible","stepMatchArguments":[{"group":{"start":16,"value":"\"Feedback\"","children":[{"start":17,"value":"Feedback","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":131,"gherkinStepLine":93,"keywordType":"Outcome","textWithKeyword":"And the footer link \"Feedback\" should be enabled","stepMatchArguments":[{"group":{"start":16,"value":"\"Feedback\"","children":[{"start":17,"value":"Feedback","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":134,"pickleLine":99,"tags":["@electrical","@footer"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":135,"gherkinStepLine":92,"keywordType":"Outcome","textWithKeyword":"Then the footer link \"Contact Support\" should be visible","stepMatchArguments":[{"group":{"start":16,"value":"\"Contact Support\"","children":[{"start":17,"value":"Contact Support","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":136,"gherkinStepLine":93,"keywordType":"Outcome","textWithKeyword":"And the footer link \"Contact Support\" should be enabled","stepMatchArguments":[{"group":{"start":16,"value":"\"Contact Support\"","children":[{"start":17,"value":"Contact Support","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":143,"pickleLine":108,"tags":["@electrical","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":144,"gherkinStepLine":103,"keywordType":"Outcome","textWithKeyword":"Then the Electrical view left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":145,"gherkinStepLine":104,"keywordType":"Outcome","textWithKeyword":"And the Electrical view left navigation menu should contain \"Home\" with associated \"visible, clickable\"","stepMatchArguments":[{"group":{"start":56,"value":"\"Home\"","children":[{"start":57,"value":"Home","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":79,"value":"\"visible, clickable\"","children":[{"start":80,"value":"visible, clickable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":148,"pickleLine":109,"tags":["@electrical","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":149,"gherkinStepLine":103,"keywordType":"Outcome","textWithKeyword":"Then the Electrical view left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":150,"gherkinStepLine":104,"keywordType":"Outcome","textWithKeyword":"And the Electrical view left navigation menu should contain \"Chart Filters\" with associated \"visible, clickable\"","stepMatchArguments":[{"group":{"start":56,"value":"\"Chart Filters\"","children":[{"start":57,"value":"Chart Filters","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":88,"value":"\"visible, clickable\"","children":[{"start":89,"value":"visible, clickable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":153,"pickleLine":110,"tags":["@electrical","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":154,"gherkinStepLine":103,"keywordType":"Outcome","textWithKeyword":"Then the Electrical view left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":155,"gherkinStepLine":104,"keywordType":"Outcome","textWithKeyword":"And the Electrical view left navigation menu should contain \"App Suite\" with associated \"Disabled, not clickable\"","stepMatchArguments":[{"group":{"start":56,"value":"\"App Suite\"","children":[{"start":57,"value":"App Suite","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":84,"value":"\"Disabled, not clickable\"","children":[{"start":85,"value":"Disabled, not clickable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":158,"pickleLine":111,"tags":["@electrical","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":159,"gherkinStepLine":103,"keywordType":"Outcome","textWithKeyword":"Then the Electrical view left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":160,"gherkinStepLine":104,"keywordType":"Outcome","textWithKeyword":"And the Electrical view left navigation menu should contain \"Circuit Condition\" with associated \"Disabled, not clickable\"","stepMatchArguments":[{"group":{"start":56,"value":"\"Circuit Condition\"","children":[{"start":57,"value":"Circuit Condition","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":92,"value":"\"Disabled, not clickable\"","children":[{"start":93,"value":"Disabled, not clickable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":163,"pickleLine":112,"tags":["@electrical","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":164,"gherkinStepLine":103,"keywordType":"Outcome","textWithKeyword":"Then the Electrical view left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":165,"gherkinStepLine":104,"keywordType":"Outcome","textWithKeyword":"And the Electrical view left navigation menu should contain \"Substation Search\" with associated \"visible, clickable\"","stepMatchArguments":[{"group":{"start":56,"value":"\"Substation Search\"","children":[{"start":57,"value":"Substation Search","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":92,"value":"\"visible, clickable\"","children":[{"start":93,"value":"visible, clickable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":168,"pickleLine":113,"tags":["@electrical","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":169,"gherkinStepLine":103,"keywordType":"Outcome","textWithKeyword":"Then the Electrical view left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":170,"gherkinStepLine":104,"keywordType":"Outcome","textWithKeyword":"And the Electrical view left navigation menu should contain \"Settings\" with associated \"visible, clickable\"","stepMatchArguments":[{"group":{"start":56,"value":"\"Settings\"","children":[{"start":57,"value":"Settings","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":83,"value":"\"visible, clickable\"","children":[{"start":84,"value":"visible, clickable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":173,"pickleLine":114,"tags":["@electrical","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Electrical Explore View for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":174,"gherkinStepLine":103,"keywordType":"Outcome","textWithKeyword":"Then the Electrical view left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":175,"gherkinStepLine":104,"keywordType":"Outcome","textWithKeyword":"And the Electrical view left navigation menu should contain \"Logout\" with associated \"visible, clickable\"","stepMatchArguments":[{"group":{"start":56,"value":"\"Logout\"","children":[{"start":57,"value":"Logout","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":81,"value":"\"visible, clickable\"","children":[{"start":82,"value":"visible, clickable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end
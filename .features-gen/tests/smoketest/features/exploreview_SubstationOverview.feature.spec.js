// Generated from: tests\smoketest\features\exploreView_SubstationOverview.feature
import { test } from "playwright-bdd";

test.describe('Smoke Test - Detect Pro Substation Explore Views', () => {

  test.beforeEach('Background', async ({ Given, page }, testInfo) => { if (testInfo.error) return;
    await Given('the user is on Detect Pro Substation Overview screen for substation under test', null, { page }); 
  });
  
  test.describe('Substation Overview Screen Left Navigation', () => {

    test('Example #1', { tag: ['@smoke', '@substation', '@navigation'] }, async ({ Then, And }) => { 
      await Then('the Substation Overview left navigation menu should be visible'); 
      await And('the Substation Overview left navigation menu should contain "Home" with associated "visible, clickable"'); 
    });

    test('Example #2', { tag: ['@smoke', '@substation', '@navigation'] }, async ({ Then, And }) => { 
      await Then('the Substation Overview left navigation menu should be visible'); 
      await And('the Substation Overview left navigation menu should contain "Chart Filters" with associated "visible, clickable"'); 
    });

    test('Example #3', { tag: ['@smoke', '@substation', '@navigation'] }, async ({ Then, And }) => { 
      await Then('the Substation Overview left navigation menu should be visible'); 
      await And('the Substation Overview left navigation menu should contain "App Suite" with associated "Disabled, not clickable"'); 
    });

    test('Example #4', { tag: ['@smoke', '@substation', '@navigation'] }, async ({ Then, And }) => { 
      await Then('the Substation Overview left navigation menu should be visible'); 
      await And('the Substation Overview left navigation menu should contain "Circuit Condition" with associated "Disabled, not clickable"'); 
    });

    test('Example #5', { tag: ['@smoke', '@substation', '@navigation'] }, async ({ Then, And }) => { 
      await Then('the Substation Overview left navigation menu should be visible'); 
      await And('the Substation Overview left navigation menu should contain "Substation Search" with associated "visible, clickable"'); 
    });

    test('Example #6', { tag: ['@smoke', '@substation', '@navigation'] }, async ({ Then, And }) => { 
      await Then('the Substation Overview left navigation menu should be visible'); 
      await And('the Substation Overview left navigation menu should contain "Settings" with associated "visible, clickable"'); 
    });

    test('Example #7', { tag: ['@smoke', '@substation', '@navigation'] }, async ({ Then, And }) => { 
      await Then('the Substation Overview left navigation menu should be visible'); 
      await And('the Substation Overview left navigation menu should contain "Logout" with associated "visible, clickable"'); 
    });

  });

  test.describe('Scenario Outline name: Substation Overview screen Fault Filters component', () => {

    test('Example #1', { tag: ['@smoke', '@substation', '@fault-filters'] }, async ({ When, Then, And }) => { 
      await Then('the Substation Overview screen should load successfully'); 
      await When('the Chart Filters icon selected'); 
      await Then('the Fault Filters panel should be visible'); 
      await And('Instrument Dropdown field should be visible provided selected substation has multiple instruments'); 
      await And('the Instrument Dropdown should be clickable'); 
      await And('the Fault Filters should contain Time Period filter with "Last 24 hours"'); 
    });

    test('Example #2', { tag: ['@smoke', '@substation', '@fault-filters'] }, async ({ When, Then, And }) => { 
      await Then('the Substation Overview screen should load successfully'); 
      await When('the Chart Filters icon selected'); 
      await Then('the Fault Filters panel should be visible'); 
      await And('Instrument Dropdown field should be visible provided selected substation has multiple instruments'); 
      await And('the Instrument Dropdown should be clickable'); 
      await And('the Fault Filters should contain Time Period filter with "Last 7 days"'); 
    });

    test('Example #3', { tag: ['@smoke', '@substation', '@fault-filters'] }, async ({ When, Then, And }) => { 
      await Then('the Substation Overview screen should load successfully'); 
      await When('the Chart Filters icon selected'); 
      await Then('the Fault Filters panel should be visible'); 
      await And('Instrument Dropdown field should be visible provided selected substation has multiple instruments'); 
      await And('the Instrument Dropdown should be clickable'); 
      await And('the Fault Filters should contain Time Period filter with "Last 30 days"'); 
    });

    test('Example #4', { tag: ['@smoke', '@substation', '@fault-filters'] }, async ({ When, Then, And }) => { 
      await Then('the Substation Overview screen should load successfully'); 
      await When('the Chart Filters icon selected'); 
      await Then('the Fault Filters panel should be visible'); 
      await And('Instrument Dropdown field should be visible provided selected substation has multiple instruments'); 
      await And('the Instrument Dropdown should be clickable'); 
      await And('the Fault Filters should contain Time Period filter with "Last 90 days"'); 
    });

    test('Example #5', { tag: ['@smoke', '@substation', '@fault-filters'] }, async ({ When, Then, And }) => { 
      await Then('the Substation Overview screen should load successfully'); 
      await When('the Chart Filters icon selected'); 
      await Then('the Fault Filters panel should be visible'); 
      await And('Instrument Dropdown field should be visible provided selected substation has multiple instruments'); 
      await And('the Instrument Dropdown should be clickable'); 
      await And('the Fault Filters should contain Time Period filter with "Single Day"'); 
    });

    test('Example #6', { tag: ['@smoke', '@substation', '@fault-filters'] }, async ({ When, Then, And }) => { 
      await Then('the Substation Overview screen should load successfully'); 
      await When('the Chart Filters icon selected'); 
      await Then('the Fault Filters panel should be visible'); 
      await And('Instrument Dropdown field should be visible provided selected substation has multiple instruments'); 
      await And('the Instrument Dropdown should be clickable'); 
      await And('the Fault Filters should contain Time Period filter with "Date Range"'); 
    });

  });

  test('Substation Overview screen Substation Details', { tag: ['@smoke', '@substation', '@data-slots'] }, async ({ When, Then, And }) => { 
    await Then('the data slot for Substation should be visible'); 
    await When('user expands the Substation data slot'); 
    await Then('the following section headers should be displayed:', {"dataTable":{"rows":[{"cells":[{"value":"section headers"}]},{"cells":[{"value":"Substation Details"}]},{"cells":[{"value":"Region"}]},{"cells":[{"value":"GPS Coordinates"}]},{"cells":[{"value":"Address"}]}]}}); 
    await And('user should be able to collapse the Substation data slot'); 
    await When('user expands Substation Notes and Images data slot'); 
    await Then('the following section headers for notes and images should be displayed:', {"dataTable":{"rows":[{"cells":[{"value":"section headers"}]},{"cells":[{"value":"Substation Images"}]},{"cells":[{"value":"Substation Notes"}]}]}}); 
    await And('user should be able to collapse the Substation Notes and Images data slot'); 
    await When('user expands Transformer data slot'); 
    await Then('the following sections should be displayed:', {"dataTable":{"rows":[{"cells":[{"value":"sections"}]},{"cells":[{"value":"Transformer Details"}]},{"cells":[{"value":"L1 Phase"}]},{"cells":[{"value":"L2 Phase"}]},{"cells":[{"value":"L3 Phase"}]},{"cells":[{"value":"N Phase"}]}]}}); 
    await And('the expanded Transformer data slot should collapse when another Transformer is selected'); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, page }) => $runScenarioHooks('before', { page }));
test.afterEach('AfterEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('after', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\smoketest\\features\\exploreView_SubstationOverview.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":12,"pickleLine":17,"tags":["@smoke","@substation","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Substation Overview screen for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the Substation Overview left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And the Substation Overview left navigation menu should contain \"Home\" with associated \"visible, clickable\"","stepMatchArguments":[{"group":{"start":60,"value":"\"Home\"","children":[{"start":61,"value":"Home","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":83,"value":"\"visible, clickable\"","children":[{"start":84,"value":"visible, clickable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":17,"pickleLine":18,"tags":["@smoke","@substation","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Substation Overview screen for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":18,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the Substation Overview left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And the Substation Overview left navigation menu should contain \"Chart Filters\" with associated \"visible, clickable\"","stepMatchArguments":[{"group":{"start":60,"value":"\"Chart Filters\"","children":[{"start":61,"value":"Chart Filters","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":92,"value":"\"visible, clickable\"","children":[{"start":93,"value":"visible, clickable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":22,"pickleLine":19,"tags":["@smoke","@substation","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Substation Overview screen for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the Substation Overview left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And the Substation Overview left navigation menu should contain \"App Suite\" with associated \"Disabled, not clickable\"","stepMatchArguments":[{"group":{"start":60,"value":"\"App Suite\"","children":[{"start":61,"value":"App Suite","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":88,"value":"\"Disabled, not clickable\"","children":[{"start":89,"value":"Disabled, not clickable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":27,"pickleLine":20,"tags":["@smoke","@substation","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Substation Overview screen for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the Substation Overview left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And the Substation Overview left navigation menu should contain \"Circuit Condition\" with associated \"Disabled, not clickable\"","stepMatchArguments":[{"group":{"start":60,"value":"\"Circuit Condition\"","children":[{"start":61,"value":"Circuit Condition","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":96,"value":"\"Disabled, not clickable\"","children":[{"start":97,"value":"Disabled, not clickable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":32,"pickleLine":21,"tags":["@smoke","@substation","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Substation Overview screen for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the Substation Overview left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And the Substation Overview left navigation menu should contain \"Substation Search\" with associated \"visible, clickable\"","stepMatchArguments":[{"group":{"start":60,"value":"\"Substation Search\"","children":[{"start":61,"value":"Substation Search","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":96,"value":"\"visible, clickable\"","children":[{"start":97,"value":"visible, clickable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":37,"pickleLine":22,"tags":["@smoke","@substation","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Substation Overview screen for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the Substation Overview left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":39,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And the Substation Overview left navigation menu should contain \"Settings\" with associated \"visible, clickable\"","stepMatchArguments":[{"group":{"start":60,"value":"\"Settings\"","children":[{"start":61,"value":"Settings","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":87,"value":"\"visible, clickable\"","children":[{"start":88,"value":"visible, clickable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":42,"pickleLine":23,"tags":["@smoke","@substation","@navigation"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Substation Overview screen for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then the Substation Overview left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And the Substation Overview left navigation menu should contain \"Logout\" with associated \"visible, clickable\"","stepMatchArguments":[{"group":{"start":60,"value":"\"Logout\"","children":[{"start":61,"value":"Logout","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":85,"value":"\"visible, clickable\"","children":[{"start":86,"value":"visible, clickable","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":51,"pickleLine":36,"tags":["@smoke","@substation","@fault-filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Substation Overview screen for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":52,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then the Substation Overview screen should load successfully","stepMatchArguments":[]},{"pwStepLine":53,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the Chart Filters icon selected","stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the Fault Filters panel should be visible","stepMatchArguments":[]},{"pwStepLine":55,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And Instrument Dropdown field should be visible provided selected substation has multiple instruments","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And the Instrument Dropdown should be clickable","stepMatchArguments":[]},{"pwStepLine":57,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And the Fault Filters should contain Time Period filter with \"Last 24 hours\"","stepMatchArguments":[{"group":{"start":57,"value":"\"Last 24 hours\"","children":[{"start":58,"value":"Last 24 hours","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":60,"pickleLine":37,"tags":["@smoke","@substation","@fault-filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Substation Overview screen for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":61,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then the Substation Overview screen should load successfully","stepMatchArguments":[]},{"pwStepLine":62,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the Chart Filters icon selected","stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the Fault Filters panel should be visible","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And Instrument Dropdown field should be visible provided selected substation has multiple instruments","stepMatchArguments":[]},{"pwStepLine":65,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And the Instrument Dropdown should be clickable","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And the Fault Filters should contain Time Period filter with \"Last 7 days\"","stepMatchArguments":[{"group":{"start":57,"value":"\"Last 7 days\"","children":[{"start":58,"value":"Last 7 days","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":69,"pickleLine":38,"tags":["@smoke","@substation","@fault-filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Substation Overview screen for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":70,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then the Substation Overview screen should load successfully","stepMatchArguments":[]},{"pwStepLine":71,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the Chart Filters icon selected","stepMatchArguments":[]},{"pwStepLine":72,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the Fault Filters panel should be visible","stepMatchArguments":[]},{"pwStepLine":73,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And Instrument Dropdown field should be visible provided selected substation has multiple instruments","stepMatchArguments":[]},{"pwStepLine":74,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And the Instrument Dropdown should be clickable","stepMatchArguments":[]},{"pwStepLine":75,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And the Fault Filters should contain Time Period filter with \"Last 30 days\"","stepMatchArguments":[{"group":{"start":57,"value":"\"Last 30 days\"","children":[{"start":58,"value":"Last 30 days","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":78,"pickleLine":39,"tags":["@smoke","@substation","@fault-filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Substation Overview screen for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":79,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then the Substation Overview screen should load successfully","stepMatchArguments":[]},{"pwStepLine":80,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the Chart Filters icon selected","stepMatchArguments":[]},{"pwStepLine":81,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the Fault Filters panel should be visible","stepMatchArguments":[]},{"pwStepLine":82,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And Instrument Dropdown field should be visible provided selected substation has multiple instruments","stepMatchArguments":[]},{"pwStepLine":83,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And the Instrument Dropdown should be clickable","stepMatchArguments":[]},{"pwStepLine":84,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And the Fault Filters should contain Time Period filter with \"Last 90 days\"","stepMatchArguments":[{"group":{"start":57,"value":"\"Last 90 days\"","children":[{"start":58,"value":"Last 90 days","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":87,"pickleLine":40,"tags":["@smoke","@substation","@fault-filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Substation Overview screen for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":88,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then the Substation Overview screen should load successfully","stepMatchArguments":[]},{"pwStepLine":89,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the Chart Filters icon selected","stepMatchArguments":[]},{"pwStepLine":90,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the Fault Filters panel should be visible","stepMatchArguments":[]},{"pwStepLine":91,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And Instrument Dropdown field should be visible provided selected substation has multiple instruments","stepMatchArguments":[]},{"pwStepLine":92,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And the Instrument Dropdown should be clickable","stepMatchArguments":[]},{"pwStepLine":93,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And the Fault Filters should contain Time Period filter with \"Single Day\"","stepMatchArguments":[{"group":{"start":57,"value":"\"Single Day\"","children":[{"start":58,"value":"Single Day","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":96,"pickleLine":41,"tags":["@smoke","@substation","@fault-filters"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Substation Overview screen for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":97,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"Then the Substation Overview screen should load successfully","stepMatchArguments":[]},{"pwStepLine":98,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"When the Chart Filters icon selected","stepMatchArguments":[]},{"pwStepLine":99,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"Then the Fault Filters panel should be visible","stepMatchArguments":[]},{"pwStepLine":100,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And Instrument Dropdown field should be visible provided selected substation has multiple instruments","stepMatchArguments":[]},{"pwStepLine":101,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And the Instrument Dropdown should be clickable","stepMatchArguments":[]},{"pwStepLine":102,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"And the Fault Filters should contain Time Period filter with \"Date Range\"","stepMatchArguments":[{"group":{"start":57,"value":"\"Date Range\"","children":[{"start":58,"value":"Date Range","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":107,"pickleLine":44,"tags":["@smoke","@substation","@data-slots"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on Detect Pro Substation Overview screen for substation under test","isBg":true,"stepMatchArguments":[]},{"pwStepLine":108,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then the data slot for Substation should be visible","stepMatchArguments":[]},{"pwStepLine":109,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"When user expands the Substation data slot","stepMatchArguments":[]},{"pwStepLine":110,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"Then the following section headers should be displayed:","stepMatchArguments":[]},{"pwStepLine":111,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"And user should be able to collapse the Substation data slot","stepMatchArguments":[]},{"pwStepLine":112,"gherkinStepLine":54,"keywordType":"Action","textWithKeyword":"When user expands Substation Notes and Images data slot","stepMatchArguments":[]},{"pwStepLine":113,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"Then the following section headers for notes and images should be displayed:","stepMatchArguments":[]},{"pwStepLine":114,"gherkinStepLine":59,"keywordType":"Outcome","textWithKeyword":"And user should be able to collapse the Substation Notes and Images data slot","stepMatchArguments":[]},{"pwStepLine":115,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"When user expands Transformer data slot","stepMatchArguments":[]},{"pwStepLine":116,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"Then the following sections should be displayed:","stepMatchArguments":[]},{"pwStepLine":117,"gherkinStepLine":68,"keywordType":"Outcome","textWithKeyword":"And the expanded Transformer data slot should collapse when another Transformer is selected","stepMatchArguments":[]}]},
]; // bdd-data-end
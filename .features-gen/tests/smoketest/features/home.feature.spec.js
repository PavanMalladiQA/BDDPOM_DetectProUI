// Generated from: tests\smoketest\features\home.feature
import { test } from "playwright-bdd";

test.describe('Smoke Test - Detect Pro Home Screen', () => {

  test.beforeEach('Background', async ({ Given }, testInfo) => { if (testInfo.error) return;
    await Given('the user is on the Detect Pro home screen'); 
  });
  
  test('Home screen loads with key UI elements', async ({ When, Then, And }) => { 
    await Then('the Instrument counts should be displayed in the banner'); 
    await And('the left navigation menu should be visible'); 
    await And('the left navigation menu should contain:', {"dataTable":{"rows":[{"cells":[{"value":"item"}]},{"cells":[{"value":"Home"}]},{"cells":[{"value":"Substation Filters"}]},{"cells":[{"value":"App suite"}]},{"cells":[{"value":"Circuit Condition"}]},{"cells":[{"value":"Substation Search"}]},{"cells":[{"value":"Settings"}]},{"cells":[{"value":"Logout"}]}]}}); 
    await And('the view toggles should be visible:', {"dataTable":{"rows":[{"cells":[{"value":"view"}]},{"cells":[{"value":"Map"}]},{"cells":[{"value":"Grid"}]},{"cells":[{"value":"Table"}]}]}}); 
    await And('the "Clear Filters" option should be visible'); 
    await And('the "Sort results by" option should not be visible on Map view'); 
    await And('the "Last updated" timestamp should be displayed'); 
    await And('the "Refresh" button should be visible'); 
    await And('the "Download Substation CSV" button should be visible'); 
    await When('I switch to Grid view'); 
    await Then('the "Sort results by" option should be visible'); 
    await When('I switch to Table view'); 
    await Then('the "Sort results by" option should be visible'); 
  });

  test('Substation Filters panel contains expected sections', async ({ When, Then, And }) => { 
    await When('the user clicks on the Substation Filters icon'); 
    await Then('the Substation Filters panel should be visible on the left side'); 
    await And('the Substation Type filter chips should be displayed:', {"dataTable":{"rows":[{"cells":[{"value":"chip"}]},{"cells":[{"value":"Ground Mounted"}]},{"cells":[{"value":"Pole Mounted"}]}]}}); 
    await And('the License Area filter should be displayed and clickable'); 
    await And('the District filter should be displayed and disabled by default'); 
    await And('the Instrument Filters section should be displayed'); 
    await And('the Instrument Search filter should be displayed'); 
    await And('the Instrument Installed filter chips should be displayed:', {"dataTable":{"rows":[{"cells":[{"value":"chip"}]},{"cells":[{"value":"Yes"}]},{"cells":[{"value":"No"}]}]}}); 
    await And('the Instrument Type filter should contain:', {"dataTable":{"rows":[{"cells":[{"value":"option"}]},{"cells":[{"value":"VisNet Hub"}]},{"cells":[{"value":"VisNet View"}]},{"cells":[{"value":"Guard"}]},{"cells":[{"value":"Reclose1"}]},{"cells":[{"value":"Reclose2"}]}]}}); 
    await And('the Offline instruments filter chips should be displayed:', {"dataTable":{"rows":[{"cells":[{"value":"chip"}]},{"cells":[{"value":"Yes"}]},{"cells":[{"value":"No"}]}]}}); 
  });

  test('Substation cards display key information and actions', async ({ Then, And }) => { 
    await Then('the substation list should be loaded in grid view'); 
    await And('each substation card should display key fields'); 
    await And('the "Quick view" button should be available on each substation card'); 
    await And('the "Explore" button should be available on each substation card'); 
  });

  test('Switch between Map and Table views', async ({ When, Then }) => { 
    await When('the user clicks on the Map view icon'); 
    await Then('the map view canvas should be displayed'); 
    await When('the user clicks on the Table view icon'); 
    await Then('the table view canvas should be displayed'); 
  });

  test('Verify panels and navigation', async ({ When, Then, And }) => { 
    await When('the user clicks on "App suite" in the left navigation menu'); 
    await Then('the App suite panel should be visible'); 
    await And('the "Alarm CSV" App suite option should be visible'); 
    await And('the "Alarm CSV" button should be visible'); 
    await When('the user clicks on "Circuit Condition" in the left navigation menu'); 
    await Then('the Circuit Condition panel should be visible'); 
  });

  test('Quick view and Explore actions', async ({ When, Then }) => { 
    await When('I switch to Grid view'); 
    await When('the user clicks on the "Quick view" button on a substation card'); 
    await Then('the Quick view panel should be displayed'); 
    await When('the user clicks on the "Explore" button in quick view'); 
    await Then('the user should be navigated to the Substation details page'); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, page }) => $runScenarioHooks('before', { page }));
test.afterEach('AfterEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('after', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\smoketest\\features\\home.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on the Detect Pro home screen","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the Instrument counts should be displayed in the banner","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And the left navigation menu should be visible","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And the left navigation menu should contain:","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And the view toggles should be visible:","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":27,"keywordType":"Outcome","textWithKeyword":"And the \"Clear Filters\" option should be visible","stepMatchArguments":[{"group":{"start":4,"value":"\"Clear Filters\"","children":[{"start":5,"value":"Clear Filters","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"And the \"Sort results by\" option should not be visible on Map view","stepMatchArguments":[{"group":{"start":4,"value":"\"Sort results by\"","children":[{"start":5,"value":"Sort results by","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And the \"Last updated\" timestamp should be displayed","stepMatchArguments":[{"group":{"start":4,"value":"\"Last updated\"","children":[{"start":5,"value":"Last updated","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":30,"keywordType":"Outcome","textWithKeyword":"And the \"Refresh\" button should be visible","stepMatchArguments":[{"group":{"start":4,"value":"\"Refresh\"","children":[{"start":5,"value":"Refresh","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":19,"gherkinStepLine":31,"keywordType":"Outcome","textWithKeyword":"And the \"Download Substation CSV\" button should be visible","stepMatchArguments":[{"group":{"start":4,"value":"\"Download Substation CSV\"","children":[{"start":5,"value":"Download Substation CSV","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"When I switch to Grid view","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then the \"Sort results by\" option should be visible","stepMatchArguments":[{"group":{"start":4,"value":"\"Sort results by\"","children":[{"start":5,"value":"Sort results by","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When I switch to Table view","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":37,"keywordType":"Outcome","textWithKeyword":"Then the \"Sort results by\" option should be visible","stepMatchArguments":[{"group":{"start":4,"value":"\"Sort results by\"","children":[{"start":5,"value":"Sort results by","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":26,"pickleLine":39,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on the Detect Pro home screen","isBg":true,"stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"When the user clicks on the Substation Filters icon","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"Then the Substation Filters panel should be visible on the left side","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":42,"keywordType":"Outcome","textWithKeyword":"And the Substation Type filter chips should be displayed:","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":46,"keywordType":"Outcome","textWithKeyword":"And the License Area filter should be displayed and clickable","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":47,"keywordType":"Outcome","textWithKeyword":"And the District filter should be displayed and disabled by default","stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":48,"keywordType":"Outcome","textWithKeyword":"And the Instrument Filters section should be displayed","stepMatchArguments":[]},{"pwStepLine":33,"gherkinStepLine":49,"keywordType":"Outcome","textWithKeyword":"And the Instrument Search filter should be displayed","stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":50,"keywordType":"Outcome","textWithKeyword":"And the Instrument Installed filter chips should be displayed:","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"And the Instrument Type filter should contain:","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":61,"keywordType":"Outcome","textWithKeyword":"And the Offline instruments filter chips should be displayed:","stepMatchArguments":[]}]},
  {"pwTestLine":39,"pickleLine":66,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on the Detect Pro home screen","isBg":true,"stepMatchArguments":[]},{"pwStepLine":40,"gherkinStepLine":67,"keywordType":"Outcome","textWithKeyword":"Then the substation list should be loaded in grid view","stepMatchArguments":[]},{"pwStepLine":41,"gherkinStepLine":68,"keywordType":"Outcome","textWithKeyword":"And each substation card should display key fields","stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"And the \"Quick view\" button should be available on each substation card","stepMatchArguments":[{"group":{"start":4,"value":"\"Quick view\"","children":[{"start":5,"value":"Quick view","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":43,"gherkinStepLine":70,"keywordType":"Outcome","textWithKeyword":"And the \"Explore\" button should be available on each substation card","stepMatchArguments":[{"group":{"start":4,"value":"\"Explore\"","children":[{"start":5,"value":"Explore","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":46,"pickleLine":72,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on the Detect Pro home screen","isBg":true,"stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":73,"keywordType":"Action","textWithKeyword":"When the user clicks on the Map view icon","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":74,"keywordType":"Outcome","textWithKeyword":"Then the map view canvas should be displayed","stepMatchArguments":[]},{"pwStepLine":49,"gherkinStepLine":75,"keywordType":"Action","textWithKeyword":"When the user clicks on the Table view icon","stepMatchArguments":[]},{"pwStepLine":50,"gherkinStepLine":76,"keywordType":"Outcome","textWithKeyword":"Then the table view canvas should be displayed","stepMatchArguments":[]}]},
  {"pwTestLine":53,"pickleLine":78,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on the Detect Pro home screen","isBg":true,"stepMatchArguments":[]},{"pwStepLine":54,"gherkinStepLine":79,"keywordType":"Action","textWithKeyword":"When the user clicks on \"App suite\" in the left navigation menu","stepMatchArguments":[{"group":{"start":19,"value":"\"App suite\"","children":[{"start":20,"value":"App suite","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":55,"gherkinStepLine":80,"keywordType":"Outcome","textWithKeyword":"Then the App suite panel should be visible","stepMatchArguments":[]},{"pwStepLine":56,"gherkinStepLine":81,"keywordType":"Outcome","textWithKeyword":"And the \"Alarm CSV\" App suite option should be visible","stepMatchArguments":[{"group":{"start":4,"value":"\"Alarm CSV\"","children":[{"start":5,"value":"Alarm CSV","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":57,"gherkinStepLine":82,"keywordType":"Outcome","textWithKeyword":"And the \"Alarm CSV\" button should be visible","stepMatchArguments":[{"group":{"start":4,"value":"\"Alarm CSV\"","children":[{"start":5,"value":"Alarm CSV","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":58,"gherkinStepLine":83,"keywordType":"Action","textWithKeyword":"When the user clicks on \"Circuit Condition\" in the left navigation menu","stepMatchArguments":[{"group":{"start":19,"value":"\"Circuit Condition\"","children":[{"start":20,"value":"Circuit Condition","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":59,"gherkinStepLine":84,"keywordType":"Outcome","textWithKeyword":"Then the Circuit Condition panel should be visible","stepMatchArguments":[]}]},
  {"pwTestLine":62,"pickleLine":86,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user is on the Detect Pro home screen","isBg":true,"stepMatchArguments":[]},{"pwStepLine":63,"gherkinStepLine":87,"keywordType":"Action","textWithKeyword":"When I switch to Grid view","stepMatchArguments":[]},{"pwStepLine":64,"gherkinStepLine":88,"keywordType":"Action","textWithKeyword":"When the user clicks on the \"Quick view\" button on a substation card","stepMatchArguments":[{"group":{"start":23,"value":"\"Quick view\"","children":[{"start":24,"value":"Quick view","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":65,"gherkinStepLine":89,"keywordType":"Outcome","textWithKeyword":"Then the Quick view panel should be displayed","stepMatchArguments":[]},{"pwStepLine":66,"gherkinStepLine":90,"keywordType":"Action","textWithKeyword":"When the user clicks on the \"Explore\" button in quick view","stepMatchArguments":[{"group":{"start":23,"value":"\"Explore\"","children":[{"start":24,"value":"Explore","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":67,"gherkinStepLine":91,"keywordType":"Outcome","textWithKeyword":"Then the user should be navigated to the Substation details page","stepMatchArguments":[]}]},
]; // bdd-data-end
// Generated from: tests\smoketest\features\login.feature
import { test } from "playwright-bdd";

test.describe('Detect Pro Application Launch and Login', () => {

  test.describe('Login with valid credentials', () => {

    test('Example #1', async ({ Given, When, Then, And, page }) => { 
      await Given('the user navigates to URL', null, { page }); 
      await When('the user enters a valid username "qadataautotest" and password "Autotest@123"'); 
      await And('clicks the login button'); 
      await Then('the user should be successfully navigated to Landing Page'); 
    });

  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, page }) => $runScenarioHooks('before', { page }));
test.afterEach('AfterEach Hooks', ({ $runScenarioHooks }) => $runScenarioHooks('after', {  }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('tests\\smoketest\\features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":15,"tags":[],"steps":[{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user navigates to URL","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When the user enters a valid username \"qadataautotest\" and password \"Autotest@123\"","stepMatchArguments":[{"group":{"start":33,"value":"\"qadataautotest\"","children":[{"start":34,"value":"qadataautotest","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":63,"value":"\"Autotest@123\"","children":[{"start":64,"value":"Autotest@123","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"And clicks the login button","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the user should be successfully navigated to Landing Page","stepMatchArguments":[]}]},
]; // bdd-data-end
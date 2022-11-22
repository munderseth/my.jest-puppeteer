
it ("test one", () => {
    console.log("TEST NAME: "+expect.getState().currentTestName);
});

it ("test two", () => {
    console.log("TEST NAME: "+expect.getState().currentTestName);
   // console.log({testStatus:testStatus, testName:testName});
});

afterEach(() => {
    console.log({testStatus:testStatus, testName:testName, describeName:describeName});
  })

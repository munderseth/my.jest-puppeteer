
beforeEach(() => {
    console.log("TEST:", testName)
});

afterEach(() => {
    console.log("STATUS:", testStatus)
    //console.log({testStatus:testStatus, testName:testName, describeName:describeName});
});

it ("test one", () => {
   // console.log("test:", expect.getState().currentTestName);
    expect(true).toBe(true);
});

it ("test two", () => {
    expect(1).toEqual(1);
});


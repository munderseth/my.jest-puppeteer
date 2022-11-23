
it ("test one", () => {
    expect(true).toBe(true);
    console.log("TEST NAME: "+expect.getState().currentTestName);
});

it ("test two", () => {
    console.log("TEST NAME: "+expect.getState().currentTestName);
    expect(1).toEqual(1);
});

afterEach(() => {
    console.log({testStatus:testStatus, testName:testName, describeName:describeName});
})


it ("test one", () => {
   // console.log("test:", expect.getState().currentTestName);
    expect(true).toBe(true);
});

it ("test two", () => {
    expect(1).toEqual(1);
});

afterEach(() => {
 //   console.log("case:", describeName+"=>"+testName, "status:", testStatus)
    //console.log({testStatus:testStatus, testName:testName, describeName:describeName});
})

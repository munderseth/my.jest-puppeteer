// custom-environment.js
const PuppeteerEnvironment = require('jest-environment-puppeteer');

class CustomEnvironment extends PuppeteerEnvironment {
    async setup() {
        await super.setup();
    }

    async handleTestEvent(event, state) {

        if (event.name === "test_start") {
            let testNames = [];
            let currentTest = event.test;
            while (currentTest) {
              testNames.push(currentTest.name);
              currentTest = currentTest.parent;
            }

            this.global.describeName = testNames[1];
            this.global.testName = testNames[0];
        };

        if (event.name === "test_fn_failure") {
            this.global.testStatus = "failure";
        } else if (event.name === "test_fn_success") {
            this.global.testStatus = "success";
        };
    }
}

module.exports = CustomEnvironment;
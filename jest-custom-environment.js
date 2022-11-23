// custom-environment.js
const PuppeteerEnvironment = require('jest-environment-puppeteer');

const fs = require('fs');
const screenshotsListFile = './screenshots-list.txt';

class CustomEnvironment extends PuppeteerEnvironment {

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
            if (this.global.page.url().includes("blank")!==true) {
                const fileName = './screenshots/'+this.global.testName+'.jpeg';
                await this.global.page.screenshot({ path: fileName});
               // fs.writeFileSync(screenshotsListFileFd, '"['+this.global.describeName+']+'+fileName+'{screenshot}"' + "\n");
                fs.appendFileSync( screenshotsListFile, '"['+this.global.describeName+']+'+fileName+'{screenshot}"' + "\n");
            }

        } else if (event.name === "test_fn_success") {
            this.global.testStatus = "success";
        };
    }
}

module.exports = CustomEnvironment;
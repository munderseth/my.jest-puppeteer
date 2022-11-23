// custom-environment.js
const PuppeteerEnvironment = require('jest-environment-puppeteer');

const fs = require('fs');
const screenshotsDir               = 'screenshots';
const screenshotsListFile          = './screenshots-list.txt';
const imageSnapshotsDir            = '__image_snapshots__';
const imageSnapshotsDiffOutputDir  = imageSnapshotsDir+'/__diff_output__';

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

            if (fs.existsSync(imageSnapshotsDiffOutputDir)) {
                var files = fs.readdirSync(imageSnapshotsDiffOutputDir);
                if (files.length ===1 ){
                    const fileName = screenshotsDir+"/"+this.global.testName+".png"
                    fs.renameSync(imageSnapshotsDiffOutputDir+"/"+files[0],fileName);
                    fs.appendFileSync( screenshotsListFile, '"['+this.global.describeName+']+'+fileName+'{screenshot}"' + "\n");
                    return; //FOUND IMAGE TO ANNOTATE
                }
            }

            if (this.global.page.url().includes("blank")!==true) {
                const fileName = './screenshots/'+this.global.testName+'.jpeg';
                await this.global.page.screenshot({ path: fileName});
                fs.appendFileSync( screenshotsListFile, '"['+this.global.describeName+']+'+fileName+'{screenshot}"' + "\n");
            }

        } else if (event.name === "test_fn_success") {
            this.global.testStatus = "success";
        };
    }
}

module.exports = CustomEnvironment;
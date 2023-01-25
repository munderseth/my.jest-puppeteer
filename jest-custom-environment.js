// custom-environment.js
const PuppeteerEnvironment = require('jest-environment-puppeteer');
const fs = require('fs');

// Configure
const testDir                      = './tests'
const imageSnapshotsDir            = testDir+'/__image_snapshots__';
const imageSnapshotsDiffOutputDir  = imageSnapshotsDir+'/__diff_output__';

const screenshotsDir               = 'screenshots';
const screenshotsListFile          = './screenshots-list.txt';

class CustomEnvironment extends PuppeteerEnvironment {

    async handleTestEvent(event, state) {  // eslint-disable-line no-unused-vars

        switch (event.name) {
            /*
               Determine the suite and case names
            */
            case "test_start":
                this.global.testScreenshot=null;
                var testNames = [];
                var currentTest = event.test;
                while (currentTest) {
                    testNames.push(currentTest.name);
                    currentTest = currentTest.parent;
                }
                this.global.describeName = testNames[1];
                this.global.testName = testNames[0];
                break;

            case "test_fn_failure":
                this.global.testStatus = "failed";

                /*
                   Check for NO image. If a page url does NOT exist (via pupeeteer) then nothing to capture
                */
                if (this.global.page.url().includes("blank")) return; // NO IMAGE TO CAPTURE

                var dirName = screenshotsDir + "/" + this.global.describeName.replace(/[^\w]/g, '');
                var fileName = dirName + "/" + this.global.testName.replace(/[^\w]/g, '_') + ".png";
                fs.mkdirSync(dirName, {recursive: true});
                this.global.testScreenshot = fileName;
                
                /*
                   Check for auto-generated Diff Image. If exist will be moved for publishing.
                */
                if (fs.existsSync(imageSnapshotsDiffOutputDir)) {
                    var files = fs.readdirSync(imageSnapshotsDiffOutputDir);
                    if (files.length > 0 ){
                        // Moving diff image to screenshots folder
                        fs.renameSync(imageSnapshotsDiffOutputDir+"/"+files[0],fileName);
                        fs.appendFileSync( screenshotsListFile, '"['+this.global.describeName+']+'+fileName+'{screenshot}"' + "\n");
                        return; // IMAGE MOVED
                    }
                }

                /*
                   If page active, but no auto-generated "Diff" image, capture current screen
                */
                await this.global.page.screenshot({ path: fileName});
                fs.appendFileSync( screenshotsListFile, '"['+this.global.describeName+']+'+fileName+'{screenshot}"' + "\n");

                break;

            case "test_fn_success":
                this.global.testStatus = "passed";
                break;
         }
    }
}

module.exports = CustomEnvironment;
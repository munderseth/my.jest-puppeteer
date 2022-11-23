# my.jest-puppeteer
Sandbox for working with Jest and Puppeteer

Publishing always include the context list, even when empty:

```
testspace junit.xml @./screenshots-list.txt
```

## Notes
Behavior:
- Always creates `screenshots` and `screenshots-list.txt`
- Can publish with an *empty* `screenshots-list.txt`
- If a snapshot "diff" image is found, moves it and annotates the list

Hardcoded settings:
- the auto-generated `screenshots` folder that contains images
- the auto-generated `screenshots-list.txt`file used for publishing images based on failures


## Setup
The following steps are required to setup from scratch.


`.gitignore`
```
node_modules
junit.xml
```
### Packages

Create initial `package.json` file.
```
npm init -y
```

Using package - https://github.com/smooth-code/jest-puppeteer
```
npm install --save-dev jest-puppeteer puppeteer jest
```

Junit output - https://www.npmjs.com/package/jest-junit
```
npm install --save-dev jest-junit
```

Using Jest Image Snapshot - https://github.com/americanexpress/jest-image-snapshot
```
npm i --save-dev jest-image-snapshot
```
### Configuration
Jest junit output - https://help.testspace.com/publish/tools-support-javascript#jest

`.package.json`:
```
"jest-junit": {
    "suiteNameTemplate": "{filepath}",
    "classNameTemplate": "{classname}",
    "titleTemplate": "{title}"
},
```

Jest configuration (`jest.config.js`):
```
module.exports = {
    preset: "jest-puppeteer",
    // Indicates whether the coverage information should be collected
     collectCoverage: false,
    "reporters": [ "default", "jest-junit" ],
    // The root directory that Jest should scan for tests and modules within
    rootDir: ".",
    // Test timeout: 60000*10 = 10min
    testTimeout: 600000,
};
```

Jest Puppeteer configuration (`jest-puppeteer.config.js`):
```
module.exports = {
    /*launch: {
      headless: false,
      slowMo: 30,
    }*/
}
```

### Custom Environment
TBD


## Usage

### Images

Image Snapshot requires expanding "Expects" within the file:
```
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });
```

module.exports = {
    preset: "jest-puppeteer",
    // Indicates whether the coverage information should be collected
     collectCoverage: false,
    "reporters": [ "default", "jest-junit" ],
    // The root directory that Jest should scan for tests and modules within
    rootDir: ".",
    "testEnvironment": "./jest-custom-environment.js",
    "globalSetup":     "./jest-custom-global-setup.js"
};
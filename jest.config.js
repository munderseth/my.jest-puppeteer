// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
module.exports = {
    preset: "jest-puppeteer",
    // Indicates whether the coverage information should be collected
     collectCoverage: false,
    "reporters": [ "default", "jest-junit" ],
    // The root directory that Jest should scan for tests and modules within
    rootDir: ".",
    // Test timeout: 60000*1 = 1min
    testTimeout: 60000,
    maxWorkers: 6, // https://jestjs.io/docs/configuration#maxworkers-number--string; this removes the console output "(node:15372) MaxListenersExceededWarning"
    "testEnvironment": "./jest-custom-environment.js",
    "globalSetup":     "./jest-custom-global-setup.js"
};
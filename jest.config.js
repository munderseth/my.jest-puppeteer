module.exports = {
    preset: "jest-puppeteer",
    // Indicates whether the coverage information should be collected
     collectCoverage: false,
    "reporters": [ "default", "jest-junit" ],
    // The root directory that Jest should scan for tests and modules within
    rootDir: ".",
    // Test timeout: 60000*10 = 10min
    testTimeout: 600000,
    "testEnvironment": "./custom-environment.js"
};
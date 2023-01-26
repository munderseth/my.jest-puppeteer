
beforeAll(() => {
  console.log("TEST FILE SETUP ...");
});

afterAll(() => {
  console.log("TEST FILE TEARDOWN ...");
});

describe('Google Test', () => {
    beforeAll(async () => {
        await page.goto('https://google.com');
    });

    /*
     * Not using console annotation approach
     */
    afterEach(async () => {
      if (testScreenshot) {
        //console.log("[[ATTACHMENT|./"+testScreenshot+"|screenshot]]");
        console.log("((ATTACHMENT|./"+testScreenshot+"|screenshot))")
      }
    });

    it('should be titled "Google"', async () => {
      await expect(page.title()).resolves.toMatch('xGoogle');
    });
    it('should display google text on page', async () => {
        const text = await page.evaluate(() => document.body.textContent)
        expect(text).toContain('google')
    });
});


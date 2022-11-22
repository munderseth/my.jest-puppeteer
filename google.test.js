
describe('Google1', () => {
    beforeAll(async () => {
      await page.goto('https://google.com');
    });

    it('should be titled "Google"', async () => {
      await expect(page.title()).resolves.toMatch('Google');
    });
    it('should display "google" text on page', async () => {
        const text = await page.evaluate(() => document.body.textContent)
        expect(text).toContain('google')
    })
  });

  describe('Google2', () => {
    beforeAll(async () => {
      await page.goto('https://google.com')
    })

    it('should display "google" text on page', async () => {
      const text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain('google')
    })
  })

const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

describe('Generic Issues', () => {

    test('Add Issue Reference', async () => {
        await page.goto("https://s2.testspace.com/projects/testspace-com:demo");
        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
    });

    test('Add Multiple Issue References', async () => {
        await page.goto("https://s2.testspace.com/projects/testspace-com:demo/spaces/main/specs");
        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
    });
});

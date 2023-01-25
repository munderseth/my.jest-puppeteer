
const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

const delay= 0
//await new Promise(resolve => setTimeout(resolve, 4000));
const sleep = (secs) => {
    return new Promise((resolve) => {
        setTimeout(resolve, secs*1000)
    });
}

describe('Visual Test', () => {

    beforeAll(async () => {
        await page.setViewport({ width: 1440, height: 1080 });
    });

    test('should match Testspace demo project', async () => {
        await page.goto("https://s2.testspace.com/projects/testspace-com:demo");
        if (process.env.HEADLESS !== 'false') {
            await sleep(delay);
        }
        const screenshot = await page.screenshot({
            clip: {
                x: 0,
                y: 0,
                width: 1325,
                height: 260
            }
        });
        expect(screenshot).toMatchImageSnapshot();
    });

    test('should match Testspace demo project Specs Listing', async () => {
        await page.goto("https://s2.testspace.com/projects/testspace-com:demo/spaces/main/specs");
        if (process.env.HEADLESS !== 'false') {
            await sleep(delay);
        }
        const screenshot = await page.screenshot();
        expect(screenshot).toMatchImageSnapshot();
    });
});

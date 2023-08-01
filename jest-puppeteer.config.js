module.exports = {
    launch: {
      args: [
        '--window-size=1920,1080'
      ],
      headless: process.env.HEADLESS ? false : 'new',
      //slowMo: 300, // represents 300ms
    }
}
exports.config = {
  baseUrl: 'http://abs.danmind.ru/_dev/#!',
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  specs: ['../build/src/**/*.protractor.js', '../build/src/**/*.e2e.js'],
  capabilities: {
    browserName: 'chrome',
    version: '',
    platform: 'ANY',
    name: process.env.TRAVIS_BUILD_NUMBER
  }
};
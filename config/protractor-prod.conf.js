exports.config = {
  baseUrl: 'http://localhost:8009/#!',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../build/src/**/*.protractor.js', '../build/src/**/*.e2e.js'],
  capabilities: {
    browserName: 'chrome',
    version: '',
    platform: 'ANY'
  },
};
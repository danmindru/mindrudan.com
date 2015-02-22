/*
 * Loggly requires a global variable '_LTracker' in order to send
 * exceptions to it's cloud service.
 *
 * To add your personal loggly key, update the empty string value
 * with your key.
 *
 * process.env.LOGGLY_KEY : '' -> process.env.LOGGLY_KEY : '<key>'
 *
 */
var _LTracker = _LTracker || [];

absConfig.pushAfterBootstrap('abs.commonLoggly');

angular.module('abs.commonLoggly').constant('LOGGLY_KEY', (typeof process !== 'undefined' && process.hasOwnProperty('env.LOGGLY_KEY')) ? process.env.LOGGLY_KEY : '');
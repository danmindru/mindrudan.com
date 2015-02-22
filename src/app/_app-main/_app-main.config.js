/*
 * Configuration block for the root module.
 * This module is the only one that does not require pushAfterBootstrap
 * (it is already registered in _app-main.init.js)
 *
 */

angular.module(absConfig.appRootModuleName).config(rootConfig);

rootConfig.$inject = ['$locationProvider', '$urlRouterProvider'];
function rootConfig($locationProvider, $urlRouterProvider){
  $locationProvider.hashPrefix('!');
  $urlRouterProvider.otherwise('/home');
}

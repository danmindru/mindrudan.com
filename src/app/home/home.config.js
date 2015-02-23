dmConfig.pushAfterBootstrap('dm.homePage');

angular.module('dm.homePage').config(homePageConfig);

homePageConfig.$inject = ['$stateProvider'];
function homePageConfig($stateProvider){
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'views/home-page.html'
  });
}

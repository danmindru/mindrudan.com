dmConfig.pushAfterBootstrap('dm.homePage');

angular.module('dm.homePage').config(homePageConfig);

homePageConfig.$inject = ['$stateProvider'];
function homePageConfig($stateProvider){
  $stateProvider.state('home', {
    url: '/',
    controller: 'HomePageController',
    controllerAs: 'vm',
    templateUrl: 'views/home-page.html',
    data:{
      pageTitle: 'I didn\'t know what title to pick for the front page'
    }
  });
}

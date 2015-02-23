dmConfig.pushAfterBootstrap('dm.aboutPage');

angular.module('dm.aboutPage').config(aboutPageConfig);

aboutPageConfig.$inject = ['$stateProvider'];
function aboutPageConfig($stateProvider){
  $stateProvider.state('about', {
    url: '/about',
    templateUrl: 'views/about-page.html',
    data: {
      pageTitle: "About me"
    }
  });
}

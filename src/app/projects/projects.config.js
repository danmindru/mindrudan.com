dmConfig.pushAfterBootstrap('dm.projectsPage');

angular.module('dm.projectsPage').config(projectsPageConfig);

projectsPageConfig.$inject = ['$stateProvider'];
function projectsPageConfig($stateProvider){
  $stateProvider.state('portal', {
    url: '/portal',
    templateUrl: 'views/portal.html',
    data: {
      pageTitle: "Project Portal"
    }
  }).state('ibog', {
    url: '/ibog',
    templateUrl: 'views/ibog.html',
    data: {
      pageTitle: "Project iBog"
    }
  }).state('yellowoffice', {
    url: '/yellowoffice',
    templateUrl: 'views/yellowoffice.html',
    data: {
      pageTitle: "Project Yellow Office"
    }
  }).state('verdo', {
    url: '/verdo',
    templateUrl: 'views/verdo.html',
    data: {
      pageTitle: "Project Verdo"
    }
  }).state('vink', {
    url: '/vink',
    templateUrl: 'views/vink.html',
    data: {
      pageTitle: "Project Vink"
    }
  }).state('easytv', {
    url: '/easytv',
    templateUrl: 'views/easytv.html',
    data: {
      pageTitle: "Project EasyTV"
    }
  });
}
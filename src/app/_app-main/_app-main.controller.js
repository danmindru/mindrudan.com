angular.module(dmConfig.appRootModuleName).controller('RootController', rootController);

rootController.$inject = ['$scope', '$window'];
function rootController($scope, $window) {
  var vm = this;
  vm.htmlTitle = 'Dan Mindru';
  /*
   * Event callback on every route change
   * Scrolls the page to the top as 'normally' changing a page
   *
   * Other available params for $stateChangeSuccess: toParams, fromState, fromParams
   *
   */
  $scope.$on('$stateChangeSuccess', function rootStateChangeSuccess(event, toState){
    /*
     * updates the <title> tag if the new route has a pageTitle set
     * (vm.htmlTitle is binded to the title tag)
     *
     */
    if(angular.isDefined(toState.data.pageTitle)){
      vm.htmlTitle = toState.data.pageTitle + ' - Dan Mindru';
    }

    $window.scrollTo(0,0);
  });

  /*
   * Listens to controllers that emit title changes
   * Used for custom titles (not from state provider),
   * when the route has a dynamic parameter.
   *
   * With this we can set the titles of 'wildcard' paths.
   * E.g. on 'customers/:Id' -> the page title can be customer.name
   *
   */
  $scope.$on('changedPage', function changedPage(event, pageTitle){
    vm.htmlTitle = pageTitle;
  });
}
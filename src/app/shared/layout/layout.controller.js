angular.module('dm.coreLayout').controller('LayoutController', layoutController);

layoutController.$inject = ['$filter'];
function layoutController($filter){
  var vm = this;
  var localCurrentDate = new Date();
  vm.currentDate = $filter('date')(localCurrentDate, 'yyyy');
}
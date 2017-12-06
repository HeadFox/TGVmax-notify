import angular from 'angular';
//
// import 'ngstorage';
import 'angular-route';
import './components';

const lightPanel = angular.module('lightPanel');

lightPanel.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/list', {
      templateUrl: 'views/list.html',
      controller: 'listController',
    })
    .otherwise({ redirectTo: '/list' });
}]);

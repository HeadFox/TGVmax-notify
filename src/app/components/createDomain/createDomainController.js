import angular from 'angular';
// import * as R from 'ramda';
import './createDomain.scss';
import '../../services/callToApi'; //eslint-disable-line

const lightPanel = angular.module('lightPanel');

lightPanel.controller('createDomainController', ['$scope', 'callToApi', '$mdDialog', ($scope, callToApi, $mdDialog) => {
  $scope.createDomain = (domain) => {
    callToApi.addDomain(domain).then(() => {
      console.log('ok');
      $scope.$emit('listVhosts');
      $mdDialog.hide();
    });
  };
}]);

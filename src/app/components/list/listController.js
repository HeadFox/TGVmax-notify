import angular from 'angular';
import './list.html';
import './list.scss';
import '../../services/callToApi'; //eslint-disable-line

const lightPanel = angular.module('lightPanel');

lightPanel.controller('listController', ['$scope', 'callToApi', ($scope, callToApi) => {
  $scope.list = {};

  const listVhosts = () => {
    callToApi.listVhosts()
      .then((results) => {
        console.log('Vhosts -->', results.data);
        $scope.list = results.data;
      })
      .catch((err) => {
        console.log('Error --->', err);
      });
  };

  $scope.toggleVhost = (domain) => {
    callToApi.toggleVhost(domain)
      .then((results) => {
        console.log('Vhosts -->', results);
        listVhosts();
      });
  };

  $scope.deleteVhost = (domain) => {
    callToApi.deleteVhost(domain)
      .then((results) => {
        console.log('Vhosts -->', results);
        listVhosts();
      });
  };

  listVhosts();
}]);

import angular from 'angular';
// import * as R from 'ramda';
import './list.html';
import './list.scss';
import '../../services/callToApi'; //eslint-disable-line

const lightPanel = angular.module('lightPanel');

lightPanel.controller('listController', ['$scope', 'callToApi', ($scope, callToApi) => {
  $scope.list = {};
  $scope.$on('listVhosts', () => {
    callToApi.listVhosts()
      .then((results) => {
        console.log('Vhosts -->', results.data);
        $scope.list = results.data;
      })
      .catch((err) => {
        console.log('Error --->', err);
      });

    callToApi.listUsers()
      .then((results) => {
        console.log('Users -->', results.data);
        $scope.users = results.data;
      })
      .catch((err) => {
        console.log('Error --->', err);
      });
  });

  $scope.toggleVhost = (domain) => {
    callToApi.toggleVhost(domain)
      .then((results) => {
        console.log('Vhosts -->', results);
        $scope.$emit('listVhosts');
      });
  };

  $scope.deleteVhost = (domain) => {
    callToApi.deleteVhost(domain)
      .then((results) => {
        console.log('Vhosts -->', results);
        $scope.$emit('listVhosts');
      });
  };

  $scope.updateVhostUser = (username, domain) => {
    callToApi.changeVhostUser(username, domain)
      .then((results) => {
        console.log('Ok -->', results);
        $scope.$emit('listVhosts');
      });
  };
  $scope.$emit('listVhosts');
}]);

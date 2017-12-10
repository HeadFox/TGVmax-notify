import angular from 'angular';
// import * as R from 'ramda';
import './list.html';
import './list.scss';
import createDomain from '../createDomain/createDomain.html';
import createUser from '../createUser/createUser.html';
import '../../services/callToApi';

console.log(createDomain);
console.log(createUser);
const lightPanel = angular.module('lightPanel');

lightPanel.controller('listController', ['$scope', 'callToApi', '$mdDialog', ($scope, callToApi, $mdDialog) => {
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
      .then(() => {
        $scope.$emit('listVhosts');
      })
      .catch(() => {
        $scope.$emit('listVhosts');
      });
  };

  $scope.showDomainForm = () => {
    $mdDialog.show({
      parent: angular.element(document.body),
      templateUrl: createDomain,
      clickOutsideToClose: true,
    });
  };

  $scope.showUserForm = () => {
    $mdDialog.show({
      parent: angular.element(document.body),
      templateUrl: createUser,
      clickOutsideToClose: true,
    });
  };
  $scope.$emit('listVhosts');
}]);

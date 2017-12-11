import angular from 'angular';
// import * as R from 'ramda';
import './list.html';
import './list.scss';
import createDomain from '../createDomain/createDomain.html';
import createUser from '../createUser/createUser.html';
import todoList from '../todoList/todoList.html';
import '../../services/callToApi';

const lightPanel = angular.module('lightPanel');

lightPanel.controller('listController', ['$scope', 'callToApi', '$mdDialog', '$mdToast', ($scope, callToApi, $mdDialog, $mdToast) => {
  $scope.list = {};
  $scope.$on('listVhosts', () => {
    callToApi.listVhosts()
      .then((results) => {
        $scope.list = results.data;
        console.log(results.data);
      })
      .catch((err) => {
        console.log('Error --->', err);
      });

    callToApi.listUsers()
      .then((results) => {
        // console.log('Users -->', results.data);
        $scope.users = results.data;
      })
      .catch((err) => {
        console.log('Error --->', err);
      });
  });

  $scope.toggleVhost = (domain) => {
    callToApi.toggleVhost(domain)
      .then((results) => {
        $mdToast.showSimple(`Succefully ${results.data} : ${domain}`);
        $scope.$emit('listVhosts');
      })
      .catch((err) => {
        console.log('Error -->', err);
      });
  };

  $scope.deleteVhost = (domain) => {
    callToApi.deleteVhost(domain)
      .then(() => {
        $mdToast.showSimple(`Succefully delete vhost : ${domain}`);
        $scope.$emit('listVhosts');
      });
  };

  $scope.updateVhostUser = (username, domain) => {
    callToApi.changeVhostUser(username, domain)
      .then(() => {
        $mdToast.showSimple(`Succefully update vhost user for ${domain}`);
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

  $scope.showTodoList = () => {
    $mdDialog.show({
      parent: angular.element(document.body),
      templateUrl: todoList,
      clickOutsideToClose: true,
    });
  };

  $scope.addHttps = (domain) => {
    callToApi.addHttps(domain)
      .then(() => {
        $mdToast.showSimple(`Succefully add https for ${domain}`);
        $scope.$emit('listVhosts');
      })
      .catch(() => $mdToast.showSimple(`Error while create https for ${domain}`));
  };

  $scope.$emit('listVhosts');
}]);

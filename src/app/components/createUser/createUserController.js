import angular from 'angular';
// import * as R from 'ramda';
import './createUser.scss';
import '../../services/callToApi'; //eslint-disable-line

const lightPanel = angular.module('lightPanel');

lightPanel.controller('createUserController', ['$scope', 'callToApi', '$mdDialog', ($scope, callToApi, $mdDialog) => {
  callToApi.listSshUsers()
    .then((results) => {
      $scope.sshUsers = results.data;
    })
    .catch((err) => {
      console.log('Error --->', err);
    });
  $scope.createUser = (user, sshUser) => {
    callToApi.addUser(user.lastname, user.firstname, sshUser)
      .then(() => {
        $mdDialog.hide();
        $scope.$emit('listVhosts');
      });
  };
}]);

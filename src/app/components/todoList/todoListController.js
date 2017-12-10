import angular from 'angular';
// import * as R from 'ramda';
import '../../services/todoListService';
import './todoList.scss';

const lightPanel = angular.module('lightPanel');

lightPanel.controller('todoListController', ['$scope', 'todoListService', ($scope, todoListService) => {
  $scope.updateContent = content => todoListService.saveToStorage(content);
  const getContent = () => {
    $scope.todoList = todoListService.getStorage();
  };

  getContent();
}]);

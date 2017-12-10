import angular from 'angular';

const lightPanel = angular.module('lightPanel');

lightPanel.service('todoListService', ['$localStorage', function ($localStorage) {//eslint-disable-line
  if (!$localStorage.todoList) {
    $localStorage.todoList = ''; //eslint-disable-line
  }

  this.saveToStorage = (content) => {
    $localStorage.todoList = content; //eslint-disable-line
  };

  this.getStorage = () => $localStorage.todoList; //eslint-disable-line
}]);

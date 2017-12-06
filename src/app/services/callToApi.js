import angular from 'angular';

const lightPanel = angular.module('lightPanel');

lightPanel.service('callToApi', ['$http', function ($http) {//eslint-disable-line
  this.listVhosts = () => $http({
    method: 'GET',
    url: 'http://10.8.174.77:3001/listvhosts',
  });

  this.toggleVhost = domain => $http({
    method: 'POST',
    url: `http://10.8.174.77:3001/togglevhost?domain=${domain}`,
  });

  this.deleteVhost = domain => $http({
    method: 'DELETE',
    url: `http://10.8.174.77:3001/delvhost?domain=${domain}`,
  });
}]);

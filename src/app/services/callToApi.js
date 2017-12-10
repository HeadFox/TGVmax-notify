import angular from 'angular';

const url = '10.8.174.77';
const lightPanel = angular.module('lightPanel');

lightPanel.service('callToApi', ['$http', function ($http) {//eslint-disable-line
  this.listVhosts = () => $http({
    method: 'GET',
    url: `http://${url}:3001/listvhosts`,
  });

  this.detailsVhost = domain => $http({
    method: 'GET',
    url: `http://${url}:3001/detailsvhost?domain=${domain}`,
  });

  // this.updateNginx = (domain, nginx) => $http({
  //   method: 'PUT',
  //   url: `http://${url}:3001/updatenginx?domain=${domain}&nginx=${nginx}`,
  // });
  this.updateNginx = (domain, nginx) => $http({
    method: 'PUT',
    url: `http://${url}:3001/updatenginx?domain=${domain}&nginx=${nginx}`,
  });

  this.listUsers = () => $http({
    method: 'GET',
    url: `http://${url}:3001/listusers`,
  });

  this.changeVhostUser = (vhostUser, domain) => $http({
    method: 'PUT',
    url: `http://${url}:3001/updatevhostuser?domain=${domain}&username=${vhostUser}`,
  });

  this.toggleVhost = domain => $http({
    method: 'POST',
    url: `http://${url}:3001/togglevhost?domain=${domain}`,
  });

  this.deleteVhost = domain => $http({
    method: 'DELETE',
    url: `http://${url}:3001/delvhost?domain=${domain}`,
  });

  this.addUser = (lastname, firstname, username) => $http({
    method: 'POST',
    url: `http://${url}:3001/addUser?lastname=${lastname}&firstname=${firstname}&username=${username}`,
  });

  this.addDomain = domain => $http({
    method: 'POST',
    url: `http://${url}:3001/addvhost?domain=${domain}`,
  });
}]);

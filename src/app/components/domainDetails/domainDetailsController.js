import angular from 'angular';
// import * as R from 'ramda';
import './domainDetails.html';
import './domainDetails.scss';

const lightPanel = angular.module('lightPanel');

lightPanel.controller('domainDetailsController', ['$scope', '$mdToast', '$localStorage', '$route', 'callToApi', ($scope, $mdToast, $localStorage, $route, callToApi) => {
  $scope.$storage = $localStorage;
  $scope.domain = $route.current.params.domain;
  const uintToString = (uintArray) => {
    const encodedString = String.fromCharCode.apply(null, uintArray);
    const decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
  };
  const getDetails = () => {
    callToApi.detailsVhost($scope.domain)
      .then((details) => {
        $scope.details = details.data;
        $scope.nginxFile = uintToString(details.data.fileBuffer.data);
      })
      .catch((err) => {
        console.log('Error -->', err);
      });
    callToApi.listUsers()
      .then((results) => {
        $scope.users = results.data;
      })
      .catch((err) => {
        console.log('Error --->', err);
      });
  };
  const utf8ToB64 = str => window.btoa(unescape(encodeURIComponent(str)));

  $scope.updateNginx = (nginx) => {
    const b64Nginx = utf8ToB64(nginx);
    callToApi.updateNginx($scope.domain, b64Nginx)
      .then(() => {
        $mdToast.showSimple('Updated Nginx config !');
        getDetails();
      })
      .catch((err) => {
        console.log('Error -->', err);
      });
  };

  $scope.toggleVhost = (domain) => {
    callToApi.toggleVhost(domain)
      .then((results) => {
        $mdToast.showSimple(`Succefully ${results.data} : ${domain}`);
        getDetails();
      })
      .catch((err) => {
        console.log('Error -->', err);
      });
  };

  $scope.updateVhostUser = (username, domain) => {
    callToApi.changeVhostUser(username, domain)
      .then(() => {
        $mdToast.showSimple(`Succefully update vhost user for ${domain}`);
        getDetails();
      })
      .catch(() => {
        getDetails();
      });
  };

  $scope.deleteVhost = (domain) => {
    callToApi.deleteVhost(domain)
      .then(() => {
        $mdToast.showSimple(`Succefully delete vhost : ${domain}`);
        getDetails();
      })
      .catch((err) => {
        console.log('Error -->', err);
      });
  };

  getDetails();
}]);

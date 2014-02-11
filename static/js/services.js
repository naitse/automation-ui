'use strict';

/* Services */

nMeter.service('webapi', ['$http', function($http){
	return {
		getAccounts: function(callback){
  			return $http.get('api/accounts').success(callback)
  		},
  		getEnvironments: function(callback){
  			return $http.get('api/environments').success(callback)
  		},
		setAccount: function(account, callback){
  			return $http.post('api/accounts', account).success(callback)
  		},
		getVersions: function(callback){
  			return $http.get('api/versions').success(callback)
  		},
		setVersion: function(version, callback){
  			return $http.post('api/versions', version).success(callback)
  		}
	}
}])
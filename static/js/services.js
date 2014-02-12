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
		removeAccount: function(account, callback){
  			return $http.delete('api/accounts/'+ account.id).success(callback)
  		},
		getVersions: function(callback){
  			return $http.get('api/versions').success(callback)
  		},
		setVersion: function(version, callback){
  			return $http.post('api/versions', version).success(callback)
  		},
		removeVersion: function(version, callback){
  			return $http.delete('api/versions/'+ version.id).success(callback)
  		},
		getProperties: function(callback){
  			return $http.get('api/properties').success(callback)
  		},
		setProperty: function(prop, callback){
  			return $http.post('api/properties', prop).success(callback)
  		},
		removeProperty: function(prop, callback){
  			return $http.delete('api/properties/'+ prop.id).success(callback)
  		}
	}
}])
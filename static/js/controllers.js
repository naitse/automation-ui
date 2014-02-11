'use strict';

/* Controllers */

angular.module('nmeter.controllers', []).
  controller('LatencyCtrl', ['$scope', 'webapi', '$q', function($scope, webapi, $q) {

  	$scope.accounts = [];
  	$scope.environments = [];
  	$scope.versions = [];
  	var versions = [];
  	var accounts = [];

  	$scope.setActiveEnv =  function(env){
  		$scope.environments.forEach(function(it){
  			it.active = false;
  		})

  		env.active = true;
  	}

  	$scope.getEnvironments = function(){
	  	webapi.getEnvironments(function(data){
			$scope.environments = data;
			$scope.environments[0].active = true
	  	})
  	}

  	$scope.getAccounts = function(){
	  	webapi.getAccounts(function(data){
	  		$scope.accounts = data;
	  		accounts = angular.copy(data);
	  	})
  	}

  	$scope.getVersions = function(){
	  	webapi.getVersions(function(data){
	  		$scope.transformVersion(data);
	  		data.forEach(function(version){
	  			extendVersion(version);
	  		})
	  		$scope.versions = data;
	  		versions = angular.copy(data);
	  	})	
  	}

  	$scope.saveAccount = function(account){
  		webapi.setAccount(account,function(data){
			accounts = angular.copy($scope.accounts);
			account.change = false;
  		})

  	}

	$scope.saveVersion = function(version){
		
		$scope.deTransformVersion([version]);

  		webapi.setVersion(version,function(data){
  			versions = angular.copy($scope.versions);
			version.change = false;
  		})

  	}

  	$scope.transformVersion = function(versions){

  		versions.forEach(function(it){
  			if(it.enabled == 0){
  				it.enabled = false;
  			}else{
  				it.enabled = true;
  			}
  		})

  	};

  	$scope.deTransformVersion = function(versions){

  		versions.forEach(function(it){
  			if(it.enabled == false){
  				it.enabled = 0;
  			}else{
  				it.enabled = 1;
  			}
  		})

  	};

  	$scope.checkIt = function(element){
          element.enabled = (element.enabled == true)?false:true;
          element.change = true
  	}

  	$scope.compareVersion = function(obj){
		
		versions.forEach(function(original){
			if(original.id == obj.id){
				if(obj.name == original.name && obj.enabled == original.enabled){
					obj.change = false;
				}else{
					obj.change = true;
				}
			}
		})

  	}

  	$scope.compareAccount = function(obj){
		
		accounts.forEach(function(original){
			if(original.id == obj.id){
				if(obj.user == original.user && obj.pass == original.pass && obj.role == original.role){
					obj.change = false;
				}else{
					obj.change = true;
				}
			}
		})

  	}

  	function extendVersion(version){
  		angular.extend(version,{change:false,tmp:{}})
  	}

	$scope.getEnvironments()
	$scope.getAccounts()
	$scope.getVersions()

  }])
  .controller('MyCtrl2', [function() {

  }]);

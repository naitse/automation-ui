'use strict';

/* Controllers */

angular.module('nmeter.controllers', []).
  controller('LatencyCtrl', ['$scope', 'webapi', '$q', function($scope, webapi, $q) {

  	$scope.accounts = [];
  	$scope.environments = [];
  	$scope.versions = [];
  	$scope.properties = [];
  	var properties = [];
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

  	$scope.addAccount = function(env){
  		$scope.accounts.push({
  			user:'',
  			pass:'',
  			role:'',
  			env:env,
  			change:true
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

  	$scope.addVersion = function(env){
  		$scope.versions.push({
  			name:'',
  			env:env,
  			version:'',
  			enabled:0,
  			change:true
  		})
  	}

 	$scope.getProperties = function(){
	  	webapi.getProperties(function(data){
	  		$scope.properties = data;
	  		properties = angular.copy(data);
	  	})	
  	}

  	$scope.addProperty = function(env){
  		$scope.properties.push({
  			key:'',
  			env:env,
  			value:'',
  			change:true
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
  			$scope.transformVersion([version]);
  			versions = angular.copy($scope.versions);
			version.change = false;
  		})

  	}

  	$scope.removeVersion = function(version){
		if(typeof version.id == 'undefined'){
			$scope.versions = _.without($scope.versions, _.findWhere($scope.versions, {name: version.name}))
			return false;
		}
  		webapi.removeVersion(version, function(data){
  			$scope.versions = _.without($scope.versions, _.findWhere($scope.versions, {id: version.id}))
  			versions = angular.copy($scope.versions);
  		})

  	}

  	  	$scope.removeAccount = function(account){
		
  		webapi.removeAccount(account, function(data){
  			$scope.accounts = _.without($scope.accounts, _.findWhere($scope.accounts, {id: account.id}))
  			accounts = angular.copy($scope.accounts);
  		})

  	}

  	  	$scope.removeProperty = function(prop){
		
  		webapi.removeProperty(prop, function(data){
  			$scope.properties = _.without($scope.properties, _.findWhere($scope.properties, {id: prop.id}))
  			properties = angular.copy($scope.properties);
  		})

  	}

	$scope.saveProperty = function(prop){
  		webapi.setProperty(prop,function(data){
			properties = angular.copy($scope.properties);
			prop.change = false;
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
				if(obj.name == original.name && obj.enabled == original.enabled && obj.version == original.version ){
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

	$scope.compareProperty = function(obj){
		
		properties.forEach(function(original){
			if(original.id == obj.id){
				if(obj.key == original.key && obj.value == original.value){
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
	$scope.getProperties()

  }])
  .controller('MyCtrl2', [function() {

  }]);

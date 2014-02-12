var request = require('request');
var dao = require('../dao/dao.js');

exports.accounts = function(req, res){
    dao.getAccounts(function(rows){
        res.json(rows);
    })
}

exports.environments = function(req, res){
    dao.getEnvironments(function(rows){
        res.json(rows);
    })
}

exports.setAccount = function(req,res){
    dao.setAccount(req.body, function(rows){
        res.json(rows);
    })
}

exports.getVersions = function(req, res){
    dao.getVersions(function(rows){
        res.json(rows);
    })
}

exports.setVersion = function(req,res){
    dao.setVersion(req.body, function(rows){
        res.json(rows);
    })
}

exports.getProperties = function(req, res){
    dao.getProperties(function(rows){
        res.json(rows);
    })
}

exports.setProperty = function(req,res){
    dao.setProperty(req.body, function(rows){
        res.json(rows);
    })
}

exports.removeAccount = function(req,res){
    dao.removeAccount(req.params['id'], function(rows){
        res.json(rows);
    })
}

exports.removeVersion = function(req,res){
    dao.removeVersion(req.params['id'], function(rows){
        res.json(rows);
    })
}

exports.removeProperty = function(req,res){
    dao.removeProperty(req.params['id'], function(rows){
        res.json(rows);
    })
}
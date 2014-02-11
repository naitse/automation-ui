var mysql = require('mysql');
var extend = require('extend');
var mysql_config = require('../mysql_config.js');
var connection = null;

function handleDisconnect() {
  connection = mysql.createConnection(mysql_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

var Users = []

module.exports = {

    getAccounts: function(callback){

        connection.query('SELECT * FROM account ORDER BY env;', function(err, rows, fields) {
            if(err){console.log(err);return false;}
            callback(rows)

        });

    },

    getEnvironments: function(callback){

        connection.query('select distinct(env) from account;', function(err, rows, fields) {
            if(err){console.log(err);return false;}
            callback(rows)

        });

    },

    getVersions: function(callback){

        connection.query('select * from muleversions;', function(err, rows, fields) {
            if(err){console.log(err);return false;}
            callback(rows)

        });

    },

    setAccount: function(account, callback){

        if(typeof account.id == 'undefined'){
           connection.query('INSERT INTO account(user, pass, role, env) values(?,?,?,?);',[account.user, account,pass, account.role, account.env], function(err, rows, fields) {
                if(err){console.log(err);return false;}
                callback(rows)

            });
        }else{
            connection.query('update account set user =?, pass = ?, role = ?, env = ? WHERE id =  ?;',[account.user, account.pass, account.role, account.env, account.id], function(err, rows, fields) {
                if(err){console.log(err);return false;}
                callback(rows)

            });
        }

    },

    setVersion: function(version, callback){

        if(typeof version.id == 'undefined'){
           connection.query('INSERT INTO muleversions(name, enabled, env) values(?,?,?);',[version.name, version.enabled, version.env], function(err, rows, fields) {
                if(err){console.log(err);return false;}
                callback(rows)

            });
        }else{
            connection.query('update muleversions set name =?, enabled = ? WHERE id =  ?;',[version.name, version.enabled, version.id], function(err, rows, fields) {
                if(err){console.log(err);return false;}
                callback(rows)

            });
        }

    }



    
};




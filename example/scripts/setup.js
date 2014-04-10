'use strict';

var path = require('path');
var config = require('../../lib/config')(path.join(__dirname, '../'), {config: 'production'});
var loggers = require('../../lib/logging')(config);
var rights = require('../../lib/rights.js')(config, loggers);
var grunt = require('grunt');

grunt.log.ok('Start setup script for baboon example app.');

function finalCallback (error) {
    if (error) {
        grunt.log.error(error);
        process.exit(1);
    }

    grunt.log.ok('Setup was successfully.');
    process.exit(0);
}

rights.ensureThatDefaultSystemUsersExists(function () {
    rights.refreshRightsIdDb(function () {
        var repos = rights.getRepositories();
        repos.rights.findOne({name: 'common/awesomeThings/index/getAll'}, function (error, right) {
            repos.users.update({name: 'guest'}, {$set: {rights: [{_id: right._id, hasAccess: true}]}}, function (error) {
                finalCallback(error);
            });
        });
    });
});
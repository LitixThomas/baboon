'use strict';

describe('Middleware/Navigation', function () {

    var path = require('path');
    var rootPath = path.resolve(path.join(__dirname, '../'));
    var baboon = require(path.resolve(path.join(rootPath, 'lib', 'baboon') ));

    it('should be defined baboon', function() {
        expect(baboon).toBeTruthy();
    });
});

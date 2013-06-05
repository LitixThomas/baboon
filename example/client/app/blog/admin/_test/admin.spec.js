/*global describe, it, expect, beforeEach, inject, runs, waitsFor */
'use strict';

var ctrl, scope, flag, value, service;

describe('admin modul', function () {
    beforeEach(module('blog'));
    beforeEach(module('baboon.services'));

    // adminCtrl tests
    describe('adminCtrl', function () {
        beforeEach(inject(function ($controller, $rootScope, $injector) {
            flag = false;
            service = $injector.get('socket');
            service.emit = function (eventName, data, callback) {
                value = {
                    data: [
                        {title: 'p1', content: 'text', created: (new Date()).toUTCString()},
                        {title: 'p2', content: 'text', created: (new Date()).toUTCString()},
                        {title: 'p3', content: 'text', created: (new Date()).toUTCString()}
                    ],
                    count: 3
                };
                callback(value);
                flag = true;
            };

            scope = $rootScope.$new();
            ctrl = $controller('adminCtrl', {$scope: scope});
        }));

        it('should be initialized correctly', function () {
            expect(scope.pager).toBeDefined();
            expect(scope.params).toBeDefined();
            expect(scope.posts).toBeUndefined();
        });

        describe('has a function sort which', function () {
            it('should sort the blog posts', function () {
                runs(function () {
                    scope.sort('title');
                });

                runs(function () {
                    expect(scope.params.sortBy).toBe('title');
                    expect(scope.params.sort).toBe(1);
                    expect(scope.posts.length).toBe(3);
                    expect(scope.pager.count).toBe(3);
                });
            });

            it('should sort the blog posts by created desc by default', function () {
                runs(function () {
                    scope.params.sort = 1;
                    scope.sort();
                });
            });

            runs(function () {
                expect(scope.params.sortBy).toBeUndefined();
                expect(scope.params.sort).toBe(-1);
                expect(scope.posts.length).toBe(3);
                expect(scope.pager.count).toBe(3);
            });
        });

        describe('has a pager which', function () {
            it('should load the blog posts when the pageSize changes', function () {
                runs(function () {
                    scope.$digest();
                    scope.pager.pageSize = 4;
                    scope.$digest();
                });

                runs(function () {
                    expect(scope.params.sortBy).toBeUndefined();
                    expect(scope.params.sort).toBeUndefined();
                    expect(scope.posts.length).toBe(3);
                    expect(scope.pager.count).toBe(3);
                });
            });

            it('should load the blog posts when the currentPage changes', function () {
                runs(function () {
                    scope.pager.currentPage = 2;
                    scope.$digest();
                });

                runs(function () {
                    expect(scope.params.sortBy).toBeUndefined();
                    expect(scope.params.sort).toBeUndefined();
                    expect(scope.posts.length).toBe(3);
                    expect(scope.pager.count).toBe(3);
                });
            });
        });
    });

    // editPostCtrl tests
    describe('editPostCtrl', function () {
        beforeEach(inject(function ($controller, $routeParams, $injector) {
            flag = false;
            service = $injector.get('socket');
            service.emit = function (eventName, data, callback) {
                if (eventName === 'blog:getAllTags') {
                    value = {data: [
                        {name: 'tag1'},
                        {name: 'tag2'},
                        {name: 'tag3'}
                    ]};
                }

                if (eventName === 'blog:getPostById') {
                    value = {
                        data: {title: 'p1', content: 'text', created: (new Date()).toUTCString()}
                    };
                }
                callback(value);
                flag = true;
            };

            scope = {};
            $routeParams.id = 22;
            ctrl = $controller('editPostCtrl', {$scope: scope});
        }));

        it('should have initialized correctly', function () {
            expect(typeof scope.save).toBe('function');
            expect(scope.lxForm).toBeDefined();
        });

        it('should load all tags', function () {
            waitsFor(function () {
                return scope.tags.length > 0;
            }, 'Length should be greater than 0', 1000);

            runs(function () {
                expect(scope.tags.length).toBe(3);
            });
        });

        it('should create a new blog post', function () {
            var post = {
                title: 'p1',
                content: 'text'
            };

            runs(function () {
                flag = false;
                inject(function ($injector) {
                    service = $injector.get('socket');
                    service.emit = function (eventName, data, callback) {
                        value = {data: data};
                        callback(value);
                        flag = true;
                    };

                    scope.save(post);
                });
            });

            runs(function () {
                expect(scope.lxForm.model.title).toBe('p1');
                expect(scope.lxForm.model.content).toBe('text');
            });
        });

        it('should update a new blog post', function () {
            var post = {
                _id: 1,
                title: 'p1',
                content: 'text'
            };

            runs(function () {
                flag = false;
                inject(function ($injector) {
                    service = $injector.get('socket');
                    service.emit = function (eventName, data, callback) {
                        value = {data: data};
                        callback(value);
                        flag = true;
                    };

                    scope.save(post);
                });
            });

            runs(function () {
                expect(scope.lxForm.model.title).toBe('p1');
                expect(scope.lxForm.model.content).toBe('text');
            });
        });

        it('should show validation errors', function () {
            var post = {
                title: 'p1',
                content: 'text'
            };

            scope.form = {
                title: 'aaa'
            };

            runs(function () {
                flag = false;
                inject(function ($injector) {
                    service = $injector.get('socket');
                    service.emit = function (eventName, data, callback) {
                        value = {errors: [
                            {property: 'title'}
                        ]};
                        callback(value);
                        flag = true;
                    };

                    scope.save(post);
                });
            });

            runs(function () {
                expect(scope.lxForm.model.title).toBe('p1');
            });
        });

        it('should show server errors', function () {
            var post = {
                title: 'p1',
                content: 'text'
            };

            runs(function () {
                flag = false;
                inject(function ($injector) {
                    service = $injector.get('socket');
                    service.emit = function (eventName, data, callback) {
                        value = {message: 'server error'};
                        callback(value);
                        flag = true;
                    };

                    scope.save(post);
                });
            });

            runs(function () {
                expect(scope.lxForm.model.title).toBe('p1');
            });
        });
    });

    // tagsCtrl tests
    describe('tagsCtrl', function () {
        beforeEach(inject(function ($controller, $rootScope, $injector) {
            flag = false;
            service = $injector.get('socket');
            service.emit = function (eventName, data, callback) {
                if (eventName === 'blog:getAllTags') {
                    value = {data: [
                        {name: 'tag1'},
                        {name: 'tag2'},
                        {name: 'tag3'}
                    ]};
                }

                if (eventName === 'blog:getPostById') {
                    value = {
                        data: {title: 'p1', content: 'text', created: (new Date()).toUTCString()}
                    };
                }

                if (eventName === 'blog:deleteTag') {
                    value = {
                        success: 1
                    };
                }

                callback(value);
                flag = true;
            };

            scope = $rootScope.$new();
            ctrl = $controller('tagsCtrl', {$scope: scope});
        }));

        it('should be initialized correctly', function () {
            expect(scope.modal).toBeDefined();
            expect(Array.isArray(scope.modal.validationErrors)).toBeTruthy();
            expect(typeof scope.modal.closeAlert).toBe('function');
            expect(typeof scope.modal.open).toBe('function');
            expect(typeof scope.modal.save).toBe('function');
            expect(typeof scope.modal.delete).toBe('function');
            expect(typeof scope.modal.close).toBe('function');
        });

        it('should close alert messages', function () {
            scope.modal.validationErrors = [
                {type: 'error', msg: 'err1'},
                {type: 'error', msg: 'err2'},
                {type: 'error', msg: 'err3'}
            ];

            scope.modal.closeAlert(1);

            expect(scope.modal.validationErrors.length).toBe(2);
            expect(scope.modal.validationErrors[0].msg).toBe('err1');
            expect(scope.modal.validationErrors[1].msg).toBe('err3');
        });

        it('should open the modal dialog', function () {
            scope.modal.validationErrors = [
                {type: 'error', msg: 'err1'},
                {type: 'error', msg: 'err2'},
                {type: 'error', msg: 'err3'}
            ];

            expect(scope.modal.items).toBeUndefined();

            runs(function () {
                scope.modal.open();
            });

            runs(function () {
                expect(scope.modal.validationErrors.length).toBe(0);
                expect(scope.modal.shouldBeOpen).toBeTruthy();
                expect(scope.modal.items.length).toBe(3);
            });
        });

        it('should close the modal dialog', function () {
            scope.modal.shouldBeOpen = true;

            runs(function () {
                scope.modal.close();
            });

            runs(function () {
                expect(scope.modal.shouldBeOpen).toBeFalsy();
            });
        });

        it('should delete a tag', function () {
            scope.modal.items = [
                {name: 'tag1', _id: 1},
                {name: 'tag2', _id: 2},
                {name: 'tag3', _id: 3}
            ];

            runs(function () {
                scope.modal.delete(scope.modal.items[1]);
            });

            runs(function () {
                expect(scope.modal.items.length).toBe(2);
                expect(scope.modal.items[0].name).toBe('tag1');
                expect(scope.modal.items[1].name).toBe('tag3');
            });
        });

        it('should show a error message when deleting a tag failed', function () {
            scope.modal.items = [
                {name: 'tag1', _id: 1},
                {name: 'tag2', _id: 2},
                {name: 'tag3', _id: 3}
            ];

            runs(function () {
                flag = false;
                inject(function ($injector) {
                    service = $injector.get('socket');
                    service.emit = function (eventName, data, callback) {
                        value = {message: 'server error'};
                        callback(value);
                        flag = true;
                    };

                    scope.modal.delete(scope.modal.items[1]);
                });
            });

            runs(function () {
                expect(scope.modal.items.length).toBe(3);
                expect(scope.modal.validationErrors.length).toBe(1);
                expect(scope.modal.validationErrors[0].type).toBe('error');
                expect(scope.modal.validationErrors[0].msg).toBe('server error');
            });
        });

        it('should save a tag', function () {
            scope.modal.items = [
                {name: 'tag1', _id: 1},
                {name: 'tag2', _id: 2},
                {name: 'tag3', _id: 3}
            ];

            runs(function () {
                flag = false;
                inject(function ($injector) {
                    service = $injector.get('socket');
                    service.emit = function (eventName, data, callback) {
                        value = {data: {name: data.name, _id: 99}};
                        callback(value);
                        flag = true;
                    };

                    scope.modal.save('tag99');
                });
            });

            runs(function () {
                expect(scope.modal.items.length).toBe(4);
                expect(scope.modal.validationErrors.length).toBe(0);
                expect(scope.modal.name).toBe('');
            });
        });

        it('should show an error when save a tag failed', function () {
            scope.modal.items = [
                {name: 'tag1', _id: 1},
                {name: 'tag2', _id: 2},
                {name: 'tag3', _id: 3}
            ];

            runs(function () {
                flag = false;
                inject(function ($injector) {
                    service = $injector.get('socket');
                    service.emit = function (eventName, data, callback) {
                        value = {errors: [
                            {property: 'name', message: 'already exists'}
                        ]};
                        callback(value);
                        flag = true;
                    };

                    scope.modal.save('tag99');
                });
            });

            runs(function () {
                expect(scope.modal.items.length).toBe(3);
                expect(scope.modal.validationErrors.length).toBe(1);
                expect(scope.modal.validationErrors[0].type).toBe('error');
                expect(scope.modal.validationErrors[0].msg).toBe('name already exists');
            });
        });

        it('should show a server error when save a tag failed', function () {
            scope.modal.items = [
                {name: 'tag1', _id: 1},
                {name: 'tag2', _id: 2},
                {name: 'tag3', _id: 3}
            ];

            runs(function () {
                flag = false;
                inject(function ($injector) {
                    service = $injector.get('socket');
                    service.emit = function (eventName, data, callback) {
                        value = {message: 'some random error'};
                        callback(value);
                        flag = true;
                    };

                    scope.modal.save('tag99');
                });
            });

            runs(function () {
                expect(scope.modal.items.length).toBe(3);
                expect(scope.modal.validationErrors.length).toBe(1);
                expect(scope.modal.validationErrors[0].type).toBe('error');
                expect(scope.modal.validationErrors[0].msg).toBe('some random error');
            });
        });
    });
});
'use strict';

exports.awesomeThings = function (req, res) {
    res.json([
        {
            name: 'HTML5 Boilerplate',
            info: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
            awesomeness: 10
        },
        {
            name: 'AngularJS',
            info: 'AngularJS is a toolset for building the framework most suited to your application development.',
            awesomeness: 10
        },
        {
            name: 'Karma',
            info: 'Spectacular Test Runner for JavaScript.',
            awesomeness: 10
        },
        {
            name: 'Express',
            info: 'Flexible and minimalist web application framework for node.js.',
            awesomeness: 10
        }
    ]);
};
//exports.nav = function (req, res) {
//
//    var toplevel = 'admin';
//
//    var nav = {
//
//        example: {
//            toplevel: true,
//            link: '/home',
//            target: '_self',
//            childs: {
//                about: {
//                    toplevel: false,
//                    link: '/about'
//                },
//                contact: {
//                    toplevel: false,
//                    link: '/contact'
//                }
//            }
//        },
//        admin: {
//            link: 'admin'
//        }
//    };
//
//
//
//    res.json([
//        {
//            name: 'HTML5 Boilerplate',
//            info: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
//            awesomeness: 10
//        },
//        {
//            name: 'AngularJS',
//            info: 'AngularJS is a toolset for building the framework most suited to your application development.',
//            awesomeness: 10
//        },
//        {
//            name: 'Karma',
//            info: 'Spectacular Test Runner for JavaScript.',
//            awesomeness: 10
//        },
//        {
//            name: 'Express',
//            info: 'Flexible and minimalist web application framework for node.js.',
//            awesomeness: 10
//        }
//    ]);
//};

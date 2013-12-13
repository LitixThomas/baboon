'use strict';

module.exports = [
    {title: 'APP_EXAMPLE', route: '/', target: '_self', children: [
        {title: 'HOME', route: '/home'},
        {title: 'ABOUT', route: '/home/about'},
        {title: 'ENTERPRISE', route: '/enterprise', right: 'app/enterprise/enterprise/getAllMembers'},
        {title: 'BLOG', route: '/blog', right: 'app/blog/blog/getAllPosts', children: [
            {title: 'ADMIN', route: '/blog/admin', right: 'app/blog/blog/createPost', children: [
                {title: 'Demo1', route: '/demo1', icon: 'home', target: '_self'},
                {title: 'Demo2', route: '/demo2', icon: 'gear'},
                {title: 'Demo3', route: '/demo3', icon: 'home'}
            ]}
        ]},
        {title: 'SESSION', route: '/session'},
        {title: 'DIAGRAMS', route: '/diagrams'},
        {title: 'TRANSLATION', route: '/translation'},
        {title: 'MODAL', route: '/modal'},
        {title: 'DATEPICKER', route: '/datepicker'}
    ]},
    {'title': 'ADMINISTRATION', 'route': '/admin', target: '_self', right: 'baboon/admin/user/create', children: [
        {title: 'USERS', route: '/admin/users', right: 'baboon/admin/user/getAll'},
        {title: 'GROUPS', route: '/admin/groups', right: 'baboon/admin/group/getAll'},
        {title: 'ROLES', route: '/admin/roles', right: 'baboon/admin/role/getAll'},
        {title: 'RIGHTS', route: '/admin/rights', right: 'baboon/admin/right/getAll'}
    ]}
];
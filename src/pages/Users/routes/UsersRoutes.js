const UsersRoutes = [
  {
    path: '/users',
    name: 'users',
    component: () => import('@/pages/Users/views/index.vue'),
    meta: {
      title: 'Users', 
    }
  },
  {
    path: '/users/create',
    name: 'users.create',
    component: () => import('@/pages/Users/views/create.vue'),
    meta: {
      title: 'Create Users',
    }
  },
  {
    path: '/users/:id/edit',
    name: 'users.edit',
    component: () => import('@/pages/Users/views/edit.vue'),
    meta: {
      title: 'Edit Users',
    }
  },
  {
    path: '/users/:id/show',
    name: 'users.show',
    component: () => import('@/pages/Users/views/show.vue'),
    meta: {
      title: 'Show Users',
    }
  }
]

export default UsersRoutes

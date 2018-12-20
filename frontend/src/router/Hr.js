export default [
  { path: '/designation', name: 'designation', meta: {parent: 'Human Resource', submenu: 'true', breadcrumb: 'Settings', breadcrumb2: 'Designation'},component: require('@/components/hr/designation/index').default},
  { path: '/section', name: 'section', meta: {parent: 'Human Resource', submenu: 'true', breadcrumb: 'Settings', breadcrumb2: 'Section'},component: require('@/components/hr/section/index').default},

  { path: '/employee', name: 'Employee', meta: {parent: 'Human Resource', submenu: 'true', breadcrumb: 'Employee', breadcrumb2: 'All'},component: require('@/components/hr/employee/index').default},
  { path: '/employee/create', name: 'EmployeeCreate', meta: {parent: 'Human Resource', submenu: 'true', breadcrumb: 'Employee', breadcrumb2: 'Create'},component: require('@/components/hr/employee/create').default},
  { path: '/employee/:id/edit', name: 'EmployeeEdit', meta: {parent: 'Human Resource', submenu: 'true', breadcrumb: 'Employee', breadcrumb2: 'Edit'},component: require('@/components/hr/employee/edit').default},

]

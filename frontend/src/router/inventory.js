export default [
  { path: '/product/create', name: 'createProduct', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Create Product', breadcrumb2: 'null'},component: require('@/components/inventory/product/create').default},
  { path: '/product', name: 'productList',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Product',breadcrumb2:'null'},component: require('@/components/inventory/product/index').default },
  {path: '/product/:id/edit',name: 'editProduct',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Product',breadcrumb2:'null'},component: require('@/components/inventory/product/edit').default},

  { path: '/vendor/create', name: 'createVendor', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Create Vendor', breadcrumb2: 'null'},component: require('@/components/inventory/vendor/create').default},
  { path: '/vendor', name: 'vendorList',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Vendor',breadcrumb2:'null'},component: require('@/components/inventory/vendor/index').default },
  {path: '/vendor/:id/edit',name: 'editVendor',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Vendor',breadcrumb2:'null'},component: require('@/components/inventory/vendor/edit').default},


]

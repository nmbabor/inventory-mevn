import companyCreate from '@/components/PrimaryInfo/company/create'
import allCompany from '@/components/PrimaryInfo/company/index'
import companyEdit from '@/components/PrimaryInfo/company/edit'
export default [
  {
    path: '/company/create', name: 'createCompany', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Create Company'},component: companyCreate
  },
  {
    path: '/company', name: 'companyList',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Company'},component: allCompany
  },
  {
    path: '/company/:id/edit',name: 'editCompany',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Company'},component: companyEdit
  },
  {
    path: '/branch/:company_id', name: 'companyBranch', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Company Branch',breadcrumb2:'null'},component: require('@/components/primaryInfo/company/branch/index').default
  },
  {
    path: '/depot/create', name: 'createDepot', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Create Depot'},component: require('@/components/inventory/depot/create').default
  },
  {
    path: '/depot', name: 'depotList',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Depot'},component: require('@/components/inventory/depot/index').default
  },
  {
    path: '/depot/:id/edit',name: 'editDepot',meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Edit Depot'},component: require('@/components/inventory/depot/edit').default
  },
  { path: '/area', name: 'area', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Zone',breadcrumb2:'null'},component: require('@/components/primaryInfo/area/index').default},

  { path: '/category', name: 'category', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Category',breadcrumb2:'null'},component: require('@/components/inventory/category/index').default },
  { path: '/units', name: 'units', meta: {parent: 'Settings', submenu: 'true', breadcrumb: 'Units',breadcrumb2:'null'},component: require('@/components/inventory/units/index').default },


]

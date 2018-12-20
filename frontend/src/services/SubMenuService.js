import Api from '@/services/Api'

export default {
  index (moduleId) {
    return Api().get('sub-menu/' + moduleId)
  },

  store (params) {
    return Api().post('sub-menu/' + params.menu_id, params)
  },

  update (params) {
    return Api().put('sub-menu/' + params.id, params)
  },

  show (params) {
    return Api().get('sub-menu/show/' + params.id)
  },

  delete (id) {
    return Api().delete('sub-menu/' + id)
  },
  serial (id) {
    return Api().get('sub-menu/' + id + '/serial')
  },
  menu (id) {
    return Api().get('menu/show/' + id)
  }
}

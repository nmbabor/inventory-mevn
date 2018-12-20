import Api from '@/services/Api'

export default {
  index (moduleId) {
    return Api().get('menu/' + moduleId)
  },

  store (params) {
    return Api().post('menu/' + params.module_id, params)
  },

  update (params) {
    return Api().put('menu/' + params.id, params)
  },

  show (params) {
    return Api().get('menu/show/' + params.id)
  },

  delete (id) {
    return Api().delete('menu/' + id)
  },
  serial (id) {
    return Api().get('menu/' + id + '/serial')
  },
  module (id) {
    return Api().get('module/' + id)
  }
}

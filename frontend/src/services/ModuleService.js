import Api from '@/services/Api'

export default {
  index () {
    return Api().get('module')
  },

  store (params) {
    return Api().post('module', params)
  },

  update (params) {
    return Api().put('module/' + params.id, params)
  },

  show (params) {
    return Api().get('module/' + params.id)
  },
  permission () {
    return Api().get('module/permissions')
  },

  delete (id) {
    return Api().delete('module/' + id)
  },
  serial () {
    return Api().get('module/serial')
  }
}

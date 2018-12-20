import Api from '@/services/Api'

export default {
  index () {
    return Api().get('permission-role')
  },
  permissions () {
    return Api().get('permissions')
  },

  store (params) {
    return Api().post('permission-role', params)
  },

  update (params) {
    return Api().put('permission-role/' + params.id, params)
  },

  show (params) {
    return Api().get('permission-role/' + params)
  },

  delete (id) {
    return Api().delete('permission-role/' + id)
  }
}

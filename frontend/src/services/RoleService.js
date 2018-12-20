import Api from '@/services/Api'

export default {
  index () {
    return Api().get('roles')
  },

  store (params) {
    return Api().post('roles', params)
  },

  update (params) {
    return Api().put('roles/' + params.id, params)
  },

  show (params) {
    return Api().get('roles/' + params.id)
  },

  delete (id) {
    return Api().delete('roles/' + id)
  }
}

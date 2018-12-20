import Api from '@/services/Api'

export default {
  index () {
    return Api().get('permissions')
  },

  store (params) {
    return Api().post('permissions', params)
  },

  update (params) {
    return Api().put('permissions/' + params.id, params)
  },

  show (params) {
    return Api().get('permissions/' + params.id)
  },

  delete (id) {
    return Api().delete('permissions/' + id)
  }
}

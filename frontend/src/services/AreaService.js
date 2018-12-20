import Api from '@/services/Api'

export default {
  index () {
    return Api().get('area')
  },

  store (params) {
    return Api().post('area', params)
  },

  update (params) {
    return Api().put('area/' + params._id, params)
  },

  show (id) {
    return Api().get('area/' + id)
  },

  delete (id) {
    return Api().delete('area/' + id)
  }

}

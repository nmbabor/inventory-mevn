import Api from '@/services/Api'

export default {
  index () {
    return Api().get('units')
  },

  store (params) {
    return Api().post('units', params)
  },

  update (params) {
    return Api().put('units/' + params._id, params)
  },

  show (id) {
    return Api().get('units/' + id)
  },

  delete (id) {
    return Api().delete('units/' + id)
  }

}

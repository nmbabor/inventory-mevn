import Api from '@/services/Api'

export default {
  index () {
    return Api().get('section')
  },

  store (params) {
    return Api().post('section', params)
  },

  update (params) {
    return Api().put('section/' + params._id, params)
  },

  show (id) {
    return Api().get('section/' + id)
  },

  delete (id) {
    return Api().delete('section/' + id)
  }

}

import Api from '@/services/Api'

export default {
  index () {
    return Api().get('designation')
  },

  store (params) {
    return Api().post('designation', params)
  },

  update (params) {
    return Api().put('designation/' + params._id, params)
  },

  show (id) {
    return Api().get('designation/' + id)
  },

  delete (id) {
    return Api().delete('designation/' + id)
  }

}

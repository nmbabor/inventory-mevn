import Api from '@/services/Api'

export default {
  index () {
    return Api().get('category')
  },

  store (params) {
    return Api().post('category', params)
  },

  update (params) {
    return Api().put('category/' + params._id, params)
  },

  show (id) {
    return Api().get('category/' + id)
  },
  company () {
    return Api().get('category/company')
  },

  delete (id) {
    return Api().delete('category/' + id)
  }

}

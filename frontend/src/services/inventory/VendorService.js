import Api from '@/services/Api'

export default {
  index () {
    return Api().get('vendor')
  },
  store (params) {
    return Api().post('vendor', params)
  },

  update (params,id) {
    return Api().put('vendor/' + id, params)
  },

  show (id) {
    return Api().get('vendor/' + id)
  },
  company () {
    return Api().get('vendor/company')
  },
  delete (id) {
    return Api().delete('vendor/' + id)
  }

}

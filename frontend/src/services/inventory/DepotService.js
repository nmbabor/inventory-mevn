import Api from '@/services/Api'

export default {
  index () {
    return Api().get('depot/')
  },

  store (params) {
    return Api().post('depot', params)
  },

  update (params) {
    return Api().put('depot/' + params._id, params)
  },

  show (id) {
    return Api().get('depot/' + id)
  },

  delete (id) {
    return Api().delete('depot/' + id)
  },
  company () {
    return Api().get('depot/company')
  },
  area () {
    return Api().get('depot/area')
  },
  branch (id) {
    return Api().get('depot/branch/'+id)
  },

}

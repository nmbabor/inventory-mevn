import Api from '@/services/Api'
export default {
  allCompany () {
    return Api().get('company')
  },
  store (params) {
    return Api().post('company', params)
  },
  update (params) {
    return Api().put('company/' + params.id, params)
  },
  edit (params) {
    return Api().get('company/' + params.id)
  },
  destroy (id) {
    return Api().delete('company/' + id)
  }
}

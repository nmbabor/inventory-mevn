import Api from '@/services/Api'

export default {
  index (companyId) {
    return Api().get('branch/' + companyId)
  },

  store (params) {
    return Api().post('branch/' + params.company_id, params)
  },

  update (params) {
    return Api().put('branch/' + params._id, params)
  },

  show (params) {
    return Api().get('branch/show/' + params.id)
  },

  delete (id) {
    return Api().delete('branch/' + id)
  },
  serial (id) {
    return Api().get('branch/' + id + '/serial')
  },
  company (id) {
    return Api().get('company/' + id)
  }
}

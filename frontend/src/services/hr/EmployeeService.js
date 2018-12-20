import Api from '@/services/Api'

export default {
  index () {
    return Api().get('employee')
  },

  store (params) {
    return Api().post('employee', params)
  },

  update (params,id) {
    return Api().put('employee/' + id, params)
  },

  show (id) {
    return Api().get('employee/' + id)
  },
  company () {
    return Api().get('employee/company')
  },
  designation () {
    return Api().get('employee/designation')
  },
  section () {
    return Api().get('employee/section')
  },
  branch (id) {
    return Api().get('employee/branch/'+id)
  },

  delete (id) {
    return Api().delete('employee/' + id)
  }

}

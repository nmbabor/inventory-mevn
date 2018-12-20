import Api from '@/services/Api'
export default {
  index () {
    return Api().get('mail')
  },
  employee (id='') {
    return Api().get('mail/employee/'+id)
  },
  send (params) {
    return Api().post('mail', params)
  },
  single (params) {
    return Api().post('mail/single', params)
  },

}

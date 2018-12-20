import Api from '@/services/Api'
export default {
  index () {
    return Api().get('sms')
  },
  employee (id='') {
    return Api().get('sms/employee/'+id)
  },
  send (params) {
    return Api().post('sms', params)
  },
  multiple (params) {
    return Api().post('sms/multiple', params)
  },

}

import Api from '@/services/Api'
export default {
  edit () {
    return Api().get('primary-info')
  },
  update (params) {
    return Api().put('primary-info', params)
  }
}

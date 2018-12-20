import Api from '@/services/Api'
export default {
  module () {
    return Api().get('frontend')
  },
  info () {
    return Api().get('frontend/info')
  },
  regiment () {
    return Api().get('frontend/regiment')
  },
  newBudget () {
    return Api().get('frontend/budget')
  }
}

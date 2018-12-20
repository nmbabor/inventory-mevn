import Api from '@/services/Api'

export default {
  allUser () {
    return Api().get('users')
  },
  roles () {
    return Api().get('users/roles')
  },
  company () {
    return Api().get('users/company')
  },
  branch () {
    return Api().get('users/branch')
  },
  store (params) {
    return Api().post('users', params)
  },

  update (params) {
    return Api().put('users/' + params.id, params.input)
  },

  show (params) {
    return Api().get('users/' + params.id)
  },
  delete (id) {
    return Api().delete('users/' + id)
  },
  login (params) {
    return Api().post('login', params)
  }
}

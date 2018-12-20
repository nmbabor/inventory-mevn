import Api from '@/services/Api'

export default {
  index () {
    return Api().get('product')
  },
  store (params) {
    return Api().post('product', params)
  },

  update (params) {
    return Api().put('product/' + params._id, params)
  },

  show (id) {
    return Api().get('product/' + id)
  },
  company () {
    return Api().get('product/company')
  },
  category () {
    return Api().get('product/category')
  },
  units () {
    return Api().get('product/units')
  },

  delete (id) {
    return Api().delete('product/' + id)
  }

}

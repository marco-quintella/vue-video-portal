import Api from '@/services/Api'

export default {
  getAll () {
    return Api().get('categories')
  },
  findByIdAndUpdate (id, data) {
    return Api().put(`categories/${id}`, data)
  },
  create (data) {
    return Api().post('categories', data)
  }
}

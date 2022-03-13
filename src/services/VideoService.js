
import Api from '@/services/Api'
import Axios from 'axios'

export default {
  getAll(data, params) {
    return Api().get(`videos/${data}`, {
      params
    })
  },
  getById(id) {
    return Api().get(`videos/${id}`)
  },
  getUploadUrl() {
    return Api().get('videos/url')
  },
  // uploadVideo(data, optional) {
  //   return Api().post('videos', data, optional)
  // },
  uploadVideo(url, data) {
    console.log(url)
    return Axios.request({
      method: 'POST',
      baseURL: url,
      url: '',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  updateVideo(id, data) {
    return Api().put(`videos/${id}`, data)
  },
  updateViews(id) {
    return Api().put(`videos/${id}/views`)
  },
  uploadThumbnail(id, data) {
    return Api().put(`videos/${id}/thumbnails`, data)
  },
  deleteById(id) {
    return Api().delete(`videos/${id}`)
  }
}


import Api from '@/services/Api'

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
  uploadVideo(data, optional) {
    return Api().post('videos', data, optional)
  },
  // uploadVideo(data) {
  //   console.log('data', data)
  //   return Api().post('', data, {
  //     baseURL: 'http://localhost:8888/.netlify/functions/upload-video',
  //     // baseURL: 'https://upbeat-almeida-b52076.netlify.app/.netlify/functions/upload-video'
  //   })
  // },
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

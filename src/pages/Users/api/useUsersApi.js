
import { ResourceApi } from '@tur1/resources-vue' 

let baseURl = '';
 function api(applyQueryParams = false) {
  return ResourceApi(baseURl, applyQueryParams)
}

const getAll = () => {
  return api().get('/Users/get-all')
}
const getPaginatedList = () => {
  return api(true).get('/Users/get-paginated-list')
}

const create = (data) => {
  return api().post('/Users/store', data)
}
const update = (data, id) => {
  return api().post('/Users/update/' + id, data)
}

const show = (id) => {
  return api().post('/Users/show/' + id)
}

const destroy = (id) => {
  return api().post('/Users/delete/' + id)
}

export default {
  getAll,
  getPaginatedList,
  create,
  update,
  show,
  destroy
}

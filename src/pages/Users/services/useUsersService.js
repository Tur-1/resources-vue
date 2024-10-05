import UsersStore from '@/pages/Users/stores/UsersStore'
import useUsersApi from '@/pages/Users/api/useUsersApi'
import { useRoute } from 'vue-router'

export default function useUsersService() {

 let routeParam = useRoute().params.id

  const getAll = async () => {
    let response = await useUsersApi.getAll()

  }
  const getPaginatedList = async () => {
    let response = await useUsersApi.getPaginatedList()

    return {
      data: response.data.data,
      pagination: { ...response.data.links, ...response.data.meta }
    }
  }
  
  const create = async (data) => {
    let response = await useUsersApi.create(data)

    return response;
  }
  const show = async () => {
    let response = await useUsersApi.show(routeParam)

    UsersStore.user = response.data.admin
  }

  const update = async (data) => {
    let response = await useUsersApi.update(data, routeParam)
    UsersStore.user = response.data.admin
  }
  const destroy = async ({item,index}) => {
    let response = await useUsersApi.destroy(item.id)

    return response;
  }

  return {
    getAll,
    getPaginatedList,
    create, 
    update,
    show,
    destroy
  }
}

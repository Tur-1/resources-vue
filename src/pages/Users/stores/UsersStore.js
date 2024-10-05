import { reactive } from 'vue'

const UsersStore = reactive({
  users: [],
  user: [],
  pagination: {},
})

export default UsersStore

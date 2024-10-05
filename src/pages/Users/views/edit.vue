<script setup>
import useUsersService from '@/pages/Users/services/useUsersService'
import UsersStore from '@/pages/Users/stores/UsersStore'
import { ResourceForm } from '@tur1/resources-vue'
import { computed, onMounted, reactive, ref } from 'vue'

let { show, update } = useUsersService()

onMounted(async () => await show(routeParam))
</script>
<template>
    <ResourceForm
      type="form"
      :submit="update"
      title="uppdate "
      :data="UsersStore.user"
    > 
          <ResourceForm type="text" label="name" name="name" id="name1" />

          <ResourceForm type="email" label="email" name="email" id="email" />  
    </ResourceForm> 
</template>

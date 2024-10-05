<script setup>
import useUsersService from '@/pages/Users/services/useUsersService' 
import { ResourceForm } from '@tur1/resources-vue' 

let { create } = useUsersService() 
</script>
<template>
    <ResourceForm
      type="form"
      :submit="create"
      title="create"
      submit-title="create"
    >
          <ResourceForm type="text" label="name" name="name" id="name1" />
          <ResourceForm type="email" label="email" name="email" id="email" />
    </ResourceForm>
</template>

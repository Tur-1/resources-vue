<script setup>
import useUsersService from '@/pages/Users/services/useUsersService'
import UsersStore from '@/pages/Users/stores/UsersStore' 
import { computed, onMounted, reactive, ref } from 'vue'

let { show } = useUsersService() 

onMounted(async () => await show())
</script>
<template>
 
</template>

<script setup>
import { ResourceList } from '@tur1/resources-vue'
import UsersResource from '@/pages/Users/UsersResource'
</script>
<template> 
    <ResourceList :resource="new UsersResource()" />
</template>

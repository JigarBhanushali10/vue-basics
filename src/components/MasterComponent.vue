<template>
    <div class="d-flex h-100">
        <SidebarComponent></SidebarComponent>
        <div className='flex-grow-1 p-3'>
            <router-view />
        </div>

    </div>

</template>

<script setup lang="ts">
import SidebarComponent from './SidebarComponent.vue';


</script>

<style scoped>

</style>
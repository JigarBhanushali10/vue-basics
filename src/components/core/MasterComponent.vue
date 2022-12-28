<template>
    <div class="d-flex h-100">
        <SidebarComponent></SidebarComponent>
        <div className='flex-grow-1 '>
            <router-view />
        </div>

    </div>

</template>

<script setup lang="ts">
/* eslint-disable */

import SidebarComponent from './SidebarComponent.vue';


</script>

<style scoped>

</style>
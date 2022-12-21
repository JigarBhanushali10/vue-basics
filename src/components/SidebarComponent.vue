<template>
     <div className='sidebar bg-white border border-1 flex-shrink-0' >

<div className='p-2 m-2 text-center border-bottom'>
    LOGO
</div>

<ul className="nav nav-pills d-flex flex-column m-3 ">
    <!-- <li className="nav-item">
        <router-link to="/list" class="nav-link">List</router-link>
    </li>
    <li className="nav-item">
        <router-link to="/form"  class="nav-link">Form</router-link>
        
    </li> -->
    <li className="nav-item">
        <router-link to="/clusters"  class="nav-link">Clusters</router-link>
        
    </li>
    <!-- <li className="nav-item">
        <router-link to="/geocoding"  class="nav-link">Geocode</router-link>
        
    </li> -->
   

</ul>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.sidebar{
    width: 200px;
}
</style>
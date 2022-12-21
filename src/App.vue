<template>


  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"  :name="name"  @callHi="hi"  :user="user"/> -->
<!-- <Copia></Copia> -->

<!-- cluster Demo -->
<!-- <MapDemo></MapDemo> -->
<MasterComponent/>

<!-- geocoding demo -->

<!-- <MapGeocodingService></MapGeocodingService> -->


<!-- Places demo -->
<!-- <PlacesDemo></PlacesDemo> -->
</template>

<script setup lang="ts">
/* eslint-disable */


import {  reactive, ref } from 'vue';
import Copia from './components/Copia.vue';
import HelloWorld from './components/HelloWorld.vue';
import MapDemo from './components/Map-Clusters.vue';
import MapGeocodingService from './components/MapGeocodingService.vue';
import PlacesDemo from './components/PlacesDemo.vue';
import DemoMap from './components/DemoMap.vue';
import MasterComponent from './components/MasterComponent.vue';


const url=require('./assets/logo.png')
const data=ref()
const hi=(...args: any[])=>{
  console.log(args);
  data.value=args
}

const user = reactive({
id:1,
name:'viral',
age:26
})
console.log(user);
user.age=23
console.log(user);

const name= ref('jigar')



</script>

<style>

</style>

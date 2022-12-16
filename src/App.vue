<template>
  <!-- <img alt="Vue logo" :src="url" :class="['success','undeline']"> -->

  <p>

    {{data}}
  </p>

  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"  :name="name"  @callHi="hi"  :user="user"/> -->
<!-- <Copia></Copia> -->
<MapDemo></MapDemo>
</template>

<script setup lang="ts">
/* eslint-disable */

import {  reactive, ref } from 'vue';
import Copia from './components/Copia.vue';
import HelloWorld from './components/HelloWorld.vue';
import MapDemo from './components/Map-Demo.vue';
// import DemoMap from './components/DemoMap.vue';


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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

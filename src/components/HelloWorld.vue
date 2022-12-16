<template>
  <div style="border:1px solid grey">
    child

    <h1>{{ msg }}</h1>
    <button @click="$emit('callHi','hello from child',1)"  title="check console">press</button>
    <br>
    
    
    <button @click="toggle">toggle view</button>
    
    
    
    <p >
      {{html}}:   
      <span v-html="html">
      </span>
    </p>


    <p v-if="seen">
      hi
    </p>

    {{user.name}}
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { defineProps ,ref,reactive} from 'vue';

//any work
const props = defineProps<{
  msg: any ,
  name: String,
  user:any 
}>()


const html ='<span style="color: red;">jigar</span>'


//any doesn't work
// defineProps({
  //   msg: String,
  //   name: String
  // user:any  dosent work
  // })
  
  const seen = ref(true)
  const toggle = ()=>{
    seen.value= !seen.value
  }
  
  const emit= defineEmits([
    'callHi'
  ])
  
  //  defineEmits([
    // 'callHi'
    // ])
    
    console.log(props,emit);
console.log(props.user);

</script>

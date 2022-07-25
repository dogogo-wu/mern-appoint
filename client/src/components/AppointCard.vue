<template>
  <div>
    <p>This is an appoint card</p>
    <p>{{ appoint.prod.title }}</p>
    <img
      class="rounded-t-lg w-80 h-48 object-cover"
      :src="`data:${appoint.prod.img.contentType};base64,${appoint.prod.img.image}`"
      alt=""
    />
    <p>Start : {{ appoint.start }}</p>
    <p>End : {{ appoint.end }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue-demi";


const props = defineProps({
  appoint: Object,
});

const timeConvert = computed(()=>{
  
})
</script>

<style>
</style>
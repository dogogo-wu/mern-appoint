<template>
  <div>
    <p>This is an appoint card</p>
    <!-- <p>Prod Base ID: {{ appoint.prod.title }}</p> -->
    <p>Start : {{ appoint.start }}</p>
    <p>End : {{ appoint.end }}</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue-demi";

const props = defineProps({
  appoint: Object,
});

onMounted(()=>{
    console.log(props.appoint.prod);
})
</script>

<style>
</style>
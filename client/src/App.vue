<template>
  <div>
    <Navbar />
    <router-view class="bg-gray-100 p-16" />
  </div>
</template>

<script setup>
import { onMounted } from "vue-demi";
import { useMyStore } from "./stores/myStore";
import Navbar from "./components/Navbar.vue";

const mystore = useMyStore();

onMounted(() => {
  mystore.user = JSON.parse(localStorage.getItem('appointuser'))
});

</script>

<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

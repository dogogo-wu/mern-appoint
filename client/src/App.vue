<template>
  <div>
    <Navbar />
    <div class="bg-gray-100 p-16 mybody">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from "vue-demi";
import { useMyStore } from "./stores/myStore";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

const mystore = useMyStore();

onMounted(() => {
  mystore.user = JSON.parse(localStorage.getItem("appointuser"));
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
.mybody{
  min-height: calc(100vh - 144px);
}
</style>

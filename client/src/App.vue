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
import Navbar from "./components/index/Navbar.vue";
import Footer from "./components/index/Footer.vue";

const mystore = useMyStore();

onMounted(async() => {
  mystore.user = JSON.parse(localStorage.getItem("appointuser"));

  if (!mystore.user) {
    return;
  }

  // init fetch to check token
  const response = await fetch(
    process.env.VUE_APP_BACKEND_LOCAL + "/api/user/init",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${mystore.user.token}` },
    }
  );
  const json = await response.json();
  if (response.ok) {
    console.log(json);
  } else {
    localStorage.removeItem("appointuser");
    mystore.user = null;
  }
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
.mybody {
  min-height: calc(100vh - 144px);
}
</style>

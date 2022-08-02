<template>
  <div>
    <Navbar />
    <div class="bg-gray-100 px-4 sm:px-16 py-4 mybody">
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
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
#app {
  font-family: Nunito, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.mybody {
  min-height: calc(100vh - 144px);
}
</style>

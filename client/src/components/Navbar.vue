<template>
  <div>
    <button class="mybtn" @click="handleLogout">Logout</button>
  </div>
</template>

<script setup>
import router from "../router/index";
import { useMyStore } from "../stores/myStore";

const mystore = useMyStore();
const handleLogout = () => {
  localStorage.removeItem("user");
  mystore.user = null;
  router.push("/");
};
</script>

<style>
</style>
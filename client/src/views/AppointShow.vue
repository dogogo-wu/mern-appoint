<template>
  <div>
    <h1>This is Appoint show page.</h1>
    <p v-if="error" class=" text-lg text-red-500 ">{{error}}</p>

    <div v-if="appoints">
      <div v-for="item in appoints" :key="item._id">
        <AppointCard :appoint="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue-demi";
import AppointCard from "../components/AppointCard.vue";
import { useMyStore } from "../stores/myStore";

var appoints = ref(null);
var error = ref(null);

onMounted(async () => {
  const mystore = useMyStore();

  if (!mystore.user) {
    error.value = "Please Login"
    return;
  }

  // Fetch appoints
  const response = await fetch(
    process.env.VUE_APP_BACKEND_LOCAL + "/api/appoints",
    {
      headers: { Authorization: `Bearer ${mystore.user.token}` },
    }
  );
  const json = await response.json();
  if (response.ok) {
    appoints.value = json;
  }
});
</script>
<template>
  <div>
    <h1>This is Appoint show page.</h1>

    <div v-if="appoints">
        <div v-for="item in appoints" :key="item._id">
            <AppointCard :appoint="item" />
        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue-demi";
import AppointCard from '../components/AppointCard.vue'

var appoints = ref(null);

onMounted(async () => {
  // Fetch appoints
  const response = await fetch(
    process.env.VUE_APP_BACKEND_LOCAL + "/api/appoints"
  );
  const json = await response.json();
  if (response.ok) {
    appoints.value = json;
  }
});
</script>
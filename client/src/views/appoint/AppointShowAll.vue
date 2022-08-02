<template>
  <div>
    <h1 class="text-lg font-bold">所有預約</h1>
    <p v-if="error" class="text-lg text-red-500">{{ error }}</p>

    <div v-if="mystore.appoints.length">
      <div v-for="item in mystore.appoints" :key="item._id">
        <AppointCard :appoint="item" />
        <AppointUpdateForm :id="item._id" :org_status="item.status" :org_message="item.message" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue-demi";
import AppointCard from "../../components/appoint/AppointCard.vue";
import AppointUpdateForm from '../../components/appoint/AppointUpdateForm.vue'
import { useMyStore } from "../../stores/myStore";

// var appoints = ref(null);
var error = ref(null);
const mystore = useMyStore();

onMounted(async () => {
  if (!mystore.user) {
    error.value = "Please Login";
    return;
  }

  // Fetch appoints
  if (!mystore.appoints.length) {
    await mystore.fetchAppos()
  }
});
</script>
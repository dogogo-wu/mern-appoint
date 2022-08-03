<template>
  <div>
    <h1 class="text-lg font-bold">My Appointments</h1>
    <p v-if="error" class="text-lg text-red-500">{{ error }}</p>

    <div v-if="appoints.length">
      <div v-for="item in appoints" :key="item._id">
        <AppointCard :appoint="item" />
      </div>
    </div>
    <div v-else class="p-4 font-bold text-cyan-600">目前沒有預約喔~</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue-demi";
import AppointCard from "../../components/appoint/AppointCard.vue";
import { useMyStore } from "../../stores/myStore";

var appoints = ref([]);
var error = ref(null);

onMounted(async () => {
  const mystore = useMyStore();

  if (!mystore.user) {
    error.value = "Please Login";
    return;
  }

  // Fetch appoints
  const response = await fetch(
    process.env.VUE_APP_BACKEND_LOCAL + "/api/appoints/my",
    {
      headers: { Authorization: `Bearer ${mystore.user.token}` },
    }
  );
  const json = await response.json();
  if (response.ok) {
    appoints.value = json;
  }else{
    console.log(json.error);
    error.value = json.error
  }

});
</script>
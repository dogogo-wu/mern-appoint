<template>
  <div>
    <h1 class="text-2xl font-bold mb-2">All Appointments</h1>
    <p v-if="error" class="text-lg text-red-500">{{ error }}</p>

    <div v-if="mystore.appoints">
      <div v-if="mystore.appoints.length">
        <div v-for="item in mystore.appoints" :key="item._id">
          <AppointCard :appoint="item" />
          <AppointUpdateForm
            :id="item._id"
            :org_status="item.status"
            :org_message="item.message"
            :user_id="item.user_id"
          />
        </div>
      </div>
      <div v-else>
        <p class="p-4 font-bold text-cyan-600">目前沒有預約喔~</p>
      </div>
    </div>
    <div v-else class="flex justify-center mt-8">
      <MyLoader />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue-demi";
import AppointCard from "../../components/appoint/AppointCard.vue";
import AppointUpdateForm from "../../components/appoint/AppointUpdateForm.vue";
import { useMyStore } from "../../stores/myStore";
import MyLoader from "../../components/index/MyLoader.vue";

// var appoints = ref(null);
var error = ref(null);
const mystore = useMyStore();

onMounted(async () => {
  if (!mystore.user) {
    error.value = "Please Login";
    return;
  }

  // Fetch appoints
  await mystore.fetchAppos();
});
</script>
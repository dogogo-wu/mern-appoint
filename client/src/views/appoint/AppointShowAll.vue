<template>
  <div>
    <h1 class="text-lg font-bold">所有預約</h1>
    <p v-if="error" class="text-lg text-red-500">{{ error }}</p>

    <div v-if="mystore.appoints">
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
  const response = await fetch(
    process.env.VUE_APP_BACKEND_LOCAL + "/api/appoints",
    {
      headers: { Authorization: `Bearer ${mystore.user.token}` },
    }
  );
  const json = await response.json();
  if (response.ok) {
    mystore.appoints = json;
  }else{
    console.log(json.error);
    error.value = json.error
  }
});
</script>
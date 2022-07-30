<template>
  <!-- Use card component and slot to reuse -->
  <div v-if="product" class="flex justify-center">
    <div class="rounded-lg shadow-lg bg-white max-w-sm">
      <img
        class="rounded-t-lg w-80 h-48 object-cover"
        :src="`data:${product.img.contentType};base64,${product.img.image}`"
        alt=""
      />
      <div class="p-6">
        <h5 class="text-gray-900 text-xl font-medium mb-2">
          {{ product.title }}
        </h5>
        <div class="text-gray-700 text-base mb-4">
          <p>Describe: {{ product.content }}</p>
          <p>prod_id: {{ product.my_id }}</p>
        </div>
      </div>

      <AppointAlready :product="product" />

      <!-- Move to a new component -->
      <form @submit.prevent="handleSubmit">
        <div class="mt-4">
          <p>開始時間</p>
          <div class="flex justify-around mx-auto">
            <input type="date" v-model="date_st" />
            <input type="time" v-model="time_st" />
          </div>
        </div>

        <div class="mt-4">
          <p>結束時間</p>
          <div class="flex justify-around mx-auto">
            <input type="date" v-model="date_end" />
            <input type="time" v-model="time_end" />
          </div>
        </div>

        <button class="appoint-btn m-4">預約</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useMyStore } from "../../stores/myStore";
import { onMounted, ref } from "vue-demi";
import router from "../../router/index";
import AppointAlready from "../../components/appoint/AppointAlready.vue";
import moment from "moment";

const props = defineProps({
  id: String,
});

const mystore = useMyStore();
var product = ref(null);
var date_st = ref("");
var time_st = ref("");
var date_end = ref("");
var time_end = ref("");

onMounted(() => {
  var d = new Date();

  var st = moment().startOf("hour").add(1, "h").format();
  var end = moment().startOf("hour").add(3, "h").format();

  date_st.value = st.split("T")[0];
  date_end.value = end.split("T")[0];

  time_st.value = st.split("T")[1].split("+")[0];
  time_end.value = end.split("T")[1].split("+")[0];

  product.value = mystore.products.find((data) => data._id === props.id);
});

const handleSubmit = async () => {
  // convert to yyyy-mm-ddThh:mm (same as datetime input)
  const start = new Date(date_st.value + "T" + time_st.value);
  const end = new Date(date_end.value + "T" + time_end.value);

  // ------------ Protect ------------
  if (start <= new Date()) {
    alert("開始時間必須晚於現在時間，請重新輸入~");
    return;
  }
  if (start >= end) {
    alert("結束時間必須晚於開始時間，請重新輸入~");
    return;
  }
  for (let i = 0; i < product.value.occupied_time.length; i++) {
    const item = product.value.occupied_time[i];
    if (checkOverlap(item, { start, end })) {
      alert("該時段已經有其他人預約囉~");
      return;
    }
  }

  // ------------ Fetch ------------
  const appoint = { start, end, prod_base_id: props.id };
  const response = await fetch(
    process.env.VUE_APP_BACKEND_LOCAL + "/api/appoints",
    {
      method: "POST",
      body: JSON.stringify(appoint),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mystore.user.token}`,
      },
    }
  );
  const json = await response.json();
  if (!response.ok) {
    console.log(json.error);
  }
  if (response.ok) {
    console.log("add new appoint", json);
    alert("預約申請已送出~請等待審核(email回覆)");
    router.push("/");
  }
};

const checkOverlap = (d1, d2) => {
  d1.start = new Date(d1.start);
  d1.end = new Date(d1.end);

  if (d1.start.getTime() < d2.start && d2.start < d1.end) {
    return true;
  }
  if (d1.start < d2.end && d2.end < d1.end) {
    return true;
  }
  if (d2.start <= d1.start && d2.end >= d1.end) {
    return true;
  }
  return false;
};
</script>

<style>
</style>
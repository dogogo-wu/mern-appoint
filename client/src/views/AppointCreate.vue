<template>
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

      <div>
        <p>已預約時段</p>
        <div v-for="item in product.occupied_time" :key="item._id">
          <p>開始：{{ convertToDateTime(item.start) }}</p>
          <p>結束：{{ convertToDateTime(item.end) }}</p>
          <p>時長：{{duration(item.start, item.end)}}</p>
        </div>
      </div>

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
import { useMyStore } from "../stores/myStore";
import { onMounted, ref } from "vue-demi";
import router from "../router/index";
import moment from 'moment'

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
  const d = new Date();
  date_st.value = d.toISOString().split("T")[0];
  date_end.value = date_st.value;

  time_st.value = d.getHours() + 1 + ":00";
  time_end.value = d.getHours() + 3 + ":00";

  product.value = mystore.products.find((data) => data._id === props.id);
});

const handleSubmit = async () => {
  // convert to yyyy-mm-ddThh:mm (same as datetime input)
  const start = new Date(date_st.value + "T" + time_st.value);
  const end = new Date(date_end.value + "T" + time_end.value);

  console.log(start);
  console.log(end);

  const appoint = { start, end, prod_base_id: props.id };
  const response = await fetch(
    process.env.VUE_APP_BACKEND_LOCAL + "/api/appoints",
    {
      method: "POST",
      body: JSON.stringify(appoint),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();
  if (!response.ok) {
    console.log(json.error);
  }
  if (response.ok) {
    console.log("add new appoint", json);
    alert("Add a new appointment!");
    router.push("/");
  }
};

const convertToDateTime = (isoStr) => {
  const d = new Date(isoStr);
  const datetime = d.toLocaleString();
  return datetime.substring(0, datetime.length - 3);
};

const duration = (t1, t2) =>{
  const a = new Date(t1);
  const b = new Date(t2);
  const diff = b-a

  var tmp = diff/1000/60/60/24
  const days = Math.floor(tmp)
  tmp = (tmp-days)*24
  const hours = Math.floor(tmp)
  tmp = (tmp-hours)*60
  const mins =  Math.round(tmp)

  const result = days + '天' + hours + '小時' + mins + '分鐘'
  return result

}
</script>

<style>
</style>
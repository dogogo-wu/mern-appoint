<template>
  <div>
    <form @submit.prevent="handleSubmit" class="flex flex-col px-6">
      <div class=" my-2 p-2 rounded border-2">
        <p class="mb-2">開始時間</p>
        <div class="flex justify-between mx-auto">
          <input type="date" v-model="date_st" />
          <input type="time" v-model="time_st" />
        </div>
      </div>

      <div class=" my-2 p-2 rounded border-2">
        <p class="mb-2">結束時間</p>
        <div class="flex justify-between mx-auto">
          <input type="date" v-model="date_end" />
          <input type="time" v-model="time_end" />
        </div>
      </div>

      <button v-if="mystore.user" class="appoint-btn mx-12 mt-4 mb-6">預約</button>
      <p v-else class="appoint-btn mx-12 mt-4 mb-6 cursor-pointer text-center" @click="handleGoLogin">登入後預約</p>
    </form>
  </div>
</template>

<script setup>
import moment from "moment";
import { useMyStore } from "../../stores/myStore";
import { onMounted, ref } from "vue-demi";
import router from "../../router/index";

const props = defineProps({
  product: Object,
  prodAppos: Array
});

const mystore = useMyStore();

var date_st = ref("");
var time_st = ref("");
var date_end = ref("");
var time_end = ref("");

onMounted(() => {
  // ------------ Set default time ------------ 
  var d = new Date();

  var st = moment().startOf("hour").add(1, "h").format();
  var end = moment().startOf("hour").add(3, "h").format();

  date_st.value = st.split("T")[0];
  date_end.value = end.split("T")[0];

  time_st.value = st.split("T")[1].split("+")[0];
  time_end.value = end.split("T")[1].split("+")[0];
});

const handleSubmit = async () => {
  // convert to yyyy-mm-ddThh:mm (same as datetime input)
  const start = new Date(date_st.value + "T" + time_st.value);
  const end = new Date(date_end.value + "T" + time_end.value);
  const duration = durationCalc(start, end)

  // ------------ Protect ------------
  if (start <= new Date()) {
    alert("開始時間必須晚於現在時間，請重新輸入~");
    return;
  }
  if (start >= end) {
    alert("結束時間必須晚於開始時間，請重新輸入~");
    return;
  }
  var tmpary = props.prodAppos.filter((data) => data.status !== 2);
  for (let i = 0; i < tmpary.length; i++) {
    const item = tmpary[i];
    if (checkOverlap(item, { start, end })) {
      alert("該時段已經有其他人預約囉~");
      return;
    }
  }

  // ------------ Fetch ------------
  const appoint = { prod_base_id: props.product._id, start, end, duration };
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

const handleGoLogin = ()=>{
  router.push('/login')
}

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

const durationCalc = (t1, t2) => {
  const a = new Date(t1);
  const b = new Date(t2);
  const diff = b - a;

  var tmp = diff / 1000 / 60 / 60 / 24;
  const days = Math.floor(tmp);
  tmp = (tmp - days) * 24;
  const hours = Math.floor(tmp + 0.000001);  // prevent Round-off error
  tmp = (tmp - hours) * 60;
  const mins = Math.round(tmp);

  const result = days + "天" + hours + "小時" + mins + "分";
  return result;
};
</script>

<style>
</style>
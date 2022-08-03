<template>
  <div v-if="tarprod">
    <div class="flex flex-wrap justify-evenly bg-white rounded-lg shadow-md p-6 my-4">
      <div class="myleft">
        <p class="font-bold">預約編號：#{{ appoint.my_id }}</p>
        <p>項目名稱：{{ tarprod.title }}</p>
        <img
          class="rounded-lg w-40 h-24 object-cover"
          :src="`data:${tarprod.img.contentType};base64,${tarprod.img.image}`"
          alt=""
        />
        <p>地點：{{ tarprod.location }}</p>
      </div>
      <!-- <div class="w-1 bg-gray-200 rounded-full"></div> -->
      <div class="myright">
        <p>
          開始：{{ startTime.split("T")[0] }} {{ startTime.split("T")[1] }}
        </p>
        <p>結束：{{ endTime.split("T")[0] }} {{ endTime.split("T")[1] }}</p>
        <p>時長：{{ appoint.duration }}</p>
        <p>
          狀態：
          <button class="status-btn" :class="statusStyle">
            {{ status }}
          </button>
        </p>
        <p>訊息：{{ tarprod.message }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue-demi";
import moment from "moment";
import { useMyStore } from "../../stores/myStore";

const props = defineProps({
  appoint: Object,
});

const mystore = useMyStore();
const tarprod = ref(null);

onMounted(async () => {
  if (!mystore.products.length) {
    await mystore.fetchProds();
  }
  tarprod.value = mystore.products.find(
    (data) => data._id === props.appoint.prod
  );
});

/**
 * Example Output: 2022-08-02T14:30
 */
const myDateTime = (isoStr) => {
  const d = new Date(isoStr);
  var datetime = moment(d).format();
  datetime = datetime.substring(0, datetime.length - 9);
  return datetime;
};

const showStatue = (status) => {
  if (status === 0) {
    return "待審核";
  } else if (status === 1) {
    return "已核可";
  } else if (status === 2) {
    return "已駁回";
  }
};

const checkStatusSytle = (status) => {
  if (status === 0) {
    return "border-yellow-500 bg-yellow-100";
  } else if (status === 1) {
    return "border-green-500 bg-green-100";
  } else if (status === 2) {
    return "border-red-500 bg-red-100";
  }
};

const startTime = computed(() => {
  return myDateTime(props.appoint.start);
});

const endTime = computed(() => {
  return myDateTime(props.appoint.end);
});

const status = computed(() => {
  return showStatue(props.appoint.status);
});

const statusStyle = computed(() => {
  return checkStatusSytle(props.appoint.status);
});
</script>

<style lang="postcss">
.myright p, .myleft p {
  margin: 6px 0;
}
.myright, .myleft{
  box-sizing: border-box;
  width:320px;
}
.myth {
  @apply text-sm
        font-semibold
        text-gray-500
        px-2
        py-4
        text-left
        break-words;
}
.mytr {
  @apply bg-white px-2 grid grid-cols-12;
}
.mytd {
  @apply text-sm text-gray-900
          font-medium
          text-left
          px-2
          py-4
          break-words;
}
.status-btn {
  @apply rounded-full border-2 py-0 px-3 pointer-events-none;
}
</style>
<template>
  <div v-if="tarprod">
    <div class="flex flex-col">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden rounded-xl">
            <table class="min-w-full">
              <thead>
                <tr class="mytr border-b border-gray-300">
                  <th class="myth">#編號</th>
                  <th class="myth col-span-2">圖片</th>
                  <th class="myth col-span-2">名稱</th>
                  <th class="myth col-span-2">開始時間</th>
                  <th class="myth col-span-2">結束時間</th>
                  <th class="myth col-span-2">總計時長</th>
                  <th class="myth">狀態</th>
                </tr>
              </thead>
              <tbody>
                <tr class="mytr">
                  <td class="mytd text-lg font-bold">{{ appoint.my_id }}</td>
                  <td class="mytd col-span-2">
                    <img
                      class="rounded-lg w-40 h-24 object-cover"
                      :src="`data:${tarprod.img.contentType};base64,${tarprod.img.image}`"
                      alt=""
                    />
                  </td>
                  <td class="mytd col-span-2">{{ tarprod.title }}</td>
                  <td class="mytd col-span-2">
                    <div>
                      <p>{{ startTime.split("T")[0] }}</p>
                      <p>{{ startTime.split("T")[1] }}</p>
                    </div>
                  </td>
                  <td class="mytd col-span-2">
                    <div>
                      <p>{{ endTime.split("T")[0] }}</p>
                      <p>{{ endTime.split("T")[1] }}</p>
                    </div>
                  </td>
                  <td class="mytd col-span-2">{{ appoint.duration }}</td>
                  <td class="mytd">
                    <button class="status-btn" :class="statusStyle">
                      {{ status }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
const tarprod = ref(null)

onMounted(async()=>{
  if (!mystore.products.length) {
    await mystore.fetchProds()
  }
  tarprod.value = mystore.products.find((data) => data._id === props.appoint.prod);
})

/**
 * Example Output: 2022-08-02T14:30
 */
const myDateTime = (isoStr) => {
  const d = new Date(isoStr);
  var datetime = moment(d).format()
  datetime = datetime.substring(0, datetime.length-9)
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
  @apply rounded-full border-2 py-2 px-3 pointer-events-none;
}
</style>
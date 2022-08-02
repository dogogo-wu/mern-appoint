<template>
  <div>
    <p>已預約時段</p>
    <div v-for="item in product.occupied_time" :key="item._id" class="already-card">
      <p>開始：{{ convertToDateTime(item.start) }}</p>
      <p>結束：{{ convertToDateTime(item.end) }}</p>
      <p>時長：{{ item.duration }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue-demi";

const props = defineProps({
  product: Object,
});

// const showStatus = (status) => {
//   if (status === 0) {
//     return "border-yellow-500";
//   } else if (status === 1) {
//     return "border-green-500";
//   } else if (status === 2) {
//     return "border-red-500";
//   }
// };
// const statusStyle = computed(() => {
//   return showStatus(props.appoint.status);
// });

const convertToDateTime = (isoStr) => {
  const d = new Date(isoStr);
  const datetime = d.toLocaleString();
  return datetime.substring(0, datetime.length - 3);
};


</script>

<style lang="postcss">
.already-card{
    @apply border-2 border-green-500 rounded m-4
}
</style>
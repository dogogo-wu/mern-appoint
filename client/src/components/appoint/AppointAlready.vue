<template>
  <div>
    <p>已預約時段</p>
    <div v-for="item in product.occupied_time" :key="item._id" class="already-card">
      <p>開始：{{ convertToDateTime(item.start) }}</p>
      <p>結束：{{ convertToDateTime(item.end) }}</p>
      <p>時長：{{ duration(item.start, item.end) }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
});

const convertToDateTime = (isoStr) => {
  const d = new Date(isoStr);
  const datetime = d.toLocaleString();
  return datetime.substring(0, datetime.length - 3);
};

const duration = (t1, t2) => {
  const a = new Date(t1);
  const b = new Date(t2);
  const diff = b - a;

  var tmp = diff / 1000 / 60 / 60 / 24;
  const days = Math.floor(tmp);
  tmp = (tmp - days) * 24;
  const hours = Math.floor(tmp);
  tmp = (tmp - hours) * 60;
  const mins = Math.round(tmp);

  const result = days + "天" + hours + "小時" + mins + "分鐘";
  return result;
};
</script>

<style lang="postcss">
.already-card{
    @apply border-2 border-green-500 rounded m-4
}
</style>
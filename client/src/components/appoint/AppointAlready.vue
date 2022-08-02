<template>
  <div>
    <p>已預約時段</p>
    <div v-for="item in prodAppos" :key="item._id" class="already-card" :class="showStatus(item.status)">
      <p>開始：{{ convertToDateTime(item.start) }}</p>
      <p>結束：{{ convertToDateTime(item.end) }}</p>
      <p>時長：{{ item.duration }}</p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  prodAppos: Array,
});

const showStatus = (status) => {
  if (status === 0) {
    return "border-yellow-500";
  } else if (status === 1) {
    return "border-green-500";
  } else if (status === 2) {
    return "border-red-500";
  }
};

const convertToDateTime = (isoStr) => {
  const d = new Date(isoStr);
  const datetime = d.toLocaleString();
  return datetime.substring(0, datetime.length - 3);
};


</script>

<style lang="postcss">
.already-card{
    @apply border-2 rounded m-4
}
</style>
<template>
  <div
    class="
      flex flex-col
      items-center
      rounded-lg
      shadow-lg
      bg-white
      min-w-sm
      m-2
    "
  >
    <h5 class="text-gray-500 text-lg font-semibold text-center py-4">
      已預約 時段
    </h5>
    <div class="flex justify-evenly w-full">
      <div class="flex items-center">
        <span class="mydot bg-yellow-500"></span>
        <span class="inline-block text-sm text-slate-500 font-semibold"
          >待審核</span
        >
      </div>
      <div class="flex items-center">
        <span class="mydot bg-green-500"></span>
        <span class="inline-block text-sm text-slate-500 font-semibold"
          >已核可</span
        >
      </div>
    </div>

    <div class="text-gray-700 text-base mb-4 w-80">
      <div v-if="prodAppos">
        <div
          v-for="item in sortProdAppos"
          :key="item._id"
          class="already-card"
          :class="showStatus(item.status)"
        >
          <p>開始：{{ convertToDateTime(item.start) }}</p>
          <p>結束：{{ convertToDateTime(item.end) }}</p>
          <p>時長：{{ item.duration }}</p>
        </div>
      </div>
      <div v-else class="flex justify-center my-8">
        <MyLoader />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue-demi";
import MyLoader from "../../components/index/MyLoader.vue";

const props = defineProps({
  prodAppos: Array,
});

const sortProdAppos = computed(() => {
  // 先濾掉reject的
  var tmpary = props.prodAppos.filter((data) => data.status !== 2);

  // 再做排序(開始時間由小到大)
  tmpary.sort(function (a, b) {
    const da = new Date(a.start);
    const db = new Date(b.start);
    return da - db;
  });
  return tmpary;
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
.already-card {
  @apply border-2 p-2 rounded-md m-4;
}
.mydot {
  @apply inline-block rounded-full w-3 h-3 mx-1;
}
</style>
<template>
  <div>
    <p>This is an appoint card</p>
    <p>{{ appoint.prod.title }}</p>
    <img
      class="rounded-t-lg w-80 h-48 object-cover"
      :src="`data:${appoint.prod.img.contentType};base64,${appoint.prod.img.image}`"
      alt=""
    />
    <p>Start : {{ startTime }}</p>
    <p>End : {{ endTime }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue-demi";

const props = defineProps({
  appoint: Object,
});

const convertToDateTime = (isoStr) => {
  const d = new Date(isoStr);
  const datetime = d.toLocaleString();
  return datetime.substring(0, datetime.length - 3);
};

const startTime = computed(() => {
  return convertToDateTime(props.appoint.start);
});

const endTime = computed(() => {
  return convertToDateTime(props.appoint.end);
});
</script>

<style>
</style>
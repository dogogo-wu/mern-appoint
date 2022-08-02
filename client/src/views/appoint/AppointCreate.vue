<template>
  <!-- Use card component and slot to reuse -->
  <div class="flex justify-center">
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

      <AppointAlready :prodAppos="prodAppos" />

      <AppointCreateForm :product="product" :prodAppos="prodAppos" />
    </div>
  </div>
</template>

<script setup>
import { useMyStore } from "../../stores/myStore";
import { onMounted, ref } from "vue-demi";
import AppointAlready from "../../components/appoint/AppointAlready.vue";
import AppointCreateForm from "../../components/appoint/AppointCreateForm.vue";

const props = defineProps({
  id: String,
});

const mystore = useMyStore();
var product = ref(null);
var prodAppos = ref([]);

onMounted(async()=>{
  if (!mystore.products.length) {
    await mystore.fetchProds()
  }
  product.value = mystore.products.find((data) => data._id === props.id);
  console.log(product.value);

  if (!mystore.appoints.length) {
    await mystore.fetchAppos()
  }
  prodAppos.value = mystore.appoints.filter((data) => data.prod === props.id);
  
  
});
</script>

<style>
</style>
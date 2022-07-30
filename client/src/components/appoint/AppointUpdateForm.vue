<template>
  <div>
    <form @submit.prevent="handleUpdate">
      <select name="status" v-model="status" required>
        <option :value="0">未處理</option>
        <option :value="1">核可</option>
        <option :value="2">駁回</option>
      </select>
      <label for="message">訊息：</label>
      <input type="text" v-model="message" />
      <button class="mybtn">送出</button>
    </form>
  </div>
</template>

<script setup>
import { useMyStore } from "../../stores/myStore";
import { ref } from "vue-demi";

const mystore = useMyStore();
var status = ref(props.org_status);
var message = ref('')

const props = defineProps({
  id: String,
  org_status: Number
});

const handleUpdate = async() => {
  const appoint = { status: status.value, message: message.value };
  const response = await fetch(
    process.env.VUE_APP_BACKEND_LOCAL + "/api/appoints/" + props.id,
    {
      method: "PATCH",
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
    console.log("sucess update appoint", json);
    alert("Sucess update appointment!");
  }
};
</script>

<style>
</style>
<template>
  <div>
    <form @submit.prevent="handleUpdate">
      <select name="status" v-model="status" required :disabled="org_status">
        <option :value="0">未處理</option>
        <option :value="1">核可</option>
        <option :value="2">駁回</option>
      </select>
      <label for="message">訊息：</label>
      <input type="text" v-model="message" required :disabled="org_status" />
      <button class="mybtn" v-if="!org_status">送出</button>
    </form>
    <button v-if="showDel" @click="handleAppoDel" class="mybtn bg-red-500 hover:bg-red-700">Delete</button>
  </div>
</template>

<script setup>
import { useMyStore } from "../../stores/myStore";
import { computed, ref } from "vue-demi";

const mystore = useMyStore();
var status = ref(props.org_status);
var message = ref(props.org_message);

const props = defineProps({
  id: String,
  org_status: Number,
  org_message: String
});

const handleUpdate = async () => {
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
    mystore.updateAppo(props.id, status.value);
  }
};

const handleAppoDel = async () => {
  const response = await fetch(
    process.env.VUE_APP_BACKEND_LOCAL + "/api/appoints/" + props.id,
    {
      headers: { Authorization: `Bearer ${mystore.user.token}` },
      method: "DELETE",
    }
  );
  const json = await response.json();
  if (!response.ok) {
    console.log(json.error);
  }
  if (response.ok) {
    mystore.deleteAppo(props.id);
    console.log("Delete one appoint", json);
  }
};
const showDel = computed(() => {
  if (mystore) {
  }
  return true;
});
</script>

<style>
</style>
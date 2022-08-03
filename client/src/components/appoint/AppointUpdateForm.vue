<template>
  <div class="flex items-center md:items-start justify-start md:justify-between flex-col md:flex-row border-b-4 border-gray-400 mb-4 p-2">
    <div class="flex items-center mb-4">
      <div class="bg-sky-500 text-white rounded-full p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </div>
      <button v-if="showDel" @click="handleAppoDel" class="mybtn mydel-btn">
        刪除預約
      </button>
      <div>
        <p class="text-sm text-gray-500 font-bold">預約人：#{{ user_id }}</p>
      </div>
    </div>

    <form @submit.prevent="handleUpdate" class="flex items-center">
      <select name="status" v-model="status" required :disabled="org_status" class="myselect mr-2">
        <option :value="0">未處理</option>
        <option :value="1">核可</option>
        <option :value="2">駁回</option>
      </select>
      <label for="message" class="text-sm font-bold text-gray-600">訊息：</label>
      <input type="text" class="myinput-send w-28 sm:w-40 " v-model="message" required :disabled="org_status" />
      <button class="mybtn ml-2" v-if="!org_status">送出</button>
    </form>
  </div>
</template>

<script setup>
import { useMyStore } from "../../stores/myStore";
import { computed, onMounted, ref } from "vue-demi";

const mystore = useMyStore();
var status = ref(props.org_status);
var message = ref(props.org_message);

const props = defineProps({
  id: String,
  org_status: Number,
  org_message: String,
  user_id: Number,
});

const handleUpdate = async () => {
  if (status.value ===0 ) {
    alert('請選擇「核可」或「駁回」')
    return
  }
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
    // console.log("sucess update appoint", json);
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
    // console.log("Delete one appoint", json);
    alert('已刪除一筆預約資料~')
  }
};
const showDel = computed(() => {
  if (mystore) {
  }
  return true;
});
</script>

<style lang="postcss">
.mydel-btn {
  @apply text-gray-600
        hover:text-white
        border-2 border-red-500
        py-1
        mx-4
        bg-transparent
        hover:bg-red-500
        transition;
}
.myselect {
  @apply bg-white border 
  border-gray-300 
  text-gray-900
   text-sm
    rounded-lg
     focus:ring-blue-500
      focus:border-blue-500
      focus-visible:ring-blue-500
      focus-visible:border-blue-500
      block
      py-2
}
.myinput-send {
  @apply block
  px-2
  py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        disabled:bg-gray-50
        disabled:text-gray-500
}
</style>
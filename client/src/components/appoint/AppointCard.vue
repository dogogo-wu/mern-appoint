<template>
  <div>
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
                      :src="`data:${appoint.prod.img.contentType};base64,${appoint.prod.img.image}`"
                      alt=""
                    />
                  </td>
                  <td class="mytd col-span-2">{{ appoint.prod.title }}</td>
                  <td class="mytd col-span-2">
                    <div>
                      <p>{{ startTime.split(" ")[0] }}</p>
                      <p>{{ startTime.split(" ")[1] }}</p>
                    </div>
                  </td>
                  <td class="mytd col-span-2">
                    <div>
                      <p>{{ endTime.split(" ")[0] }}</p>
                      <p>{{ endTime.split(" ")[1] }}</p>
                    </div>
                  </td>
                  <td class="mytd col-span-2">{{ duration }}</td>
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
import { computed } from "vue-demi";

const props = defineProps({
  appoint: Object,
});

const convertToDateTime = (isoStr) => {
  const d = new Date(isoStr);
  const datetime = d.toLocaleString();
  return datetime.substring(0, datetime.length - 3);
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

const durationCalc = (t1, t2) => {
  const a = new Date(t1);
  const b = new Date(t2);
  const diff = b - a;

  var tmp = diff / 1000 / 60 / 60 / 24;
  const days = Math.floor(tmp);
  tmp = (tmp - days) * 24;
  const hours = Math.floor(tmp + 0.000000001);  // prevent Round-off error
  tmp = (tmp - hours) * 60;
  const mins = Math.round(tmp);

  const result = days + "天" + hours + "小時" + mins + "分";
  return result;
};

const startTime = computed(() => {
  return convertToDateTime(props.appoint.start);
});

const endTime = computed(() => {
  return convertToDateTime(props.appoint.end);
});

const status = computed(() => {
  return showStatue(props.appoint.status);
});

const duration = computed(() => {
  return durationCalc(props.appoint.start, props.appoint.end);
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
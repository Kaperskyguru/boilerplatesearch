<template>
  <a :href="item?.url">
    <div class="max-w-sm border rounded-lg shadow bg-black border-gray-700">
      <div class="shadow-lg border-b border-gray-700 w-full">
        <img class="w-ful object-fll" src="~/assets/img/shipfast.png" alt="" />
      </div>
      <div class="p-5">
        <div class="flex justify-between items-center py-2">
          <h2 class="mb-2 text-2xl font-bold tracking-tight text-white">
            {{ item?.title }}
          </h2>
          <a
            v-if="item?.shouldWriteReview"
            href="/articles/shipfast"
            class="px-2 py-1 rounded-lg border"
          >
            My review
          </a>
        </div>
        <p class="mb-3 font-normal text-gray-400">
          {{ item?.description }}
        </p>

        <h3 class="font-bold text-2xl">
          Price:
          <span class="text-xl font-light text-green-500">{{
            item?.price
          }}</span>
        </h3>
      </div>

      <div class="flex gap-1 p-4 flex-wrap border-t border-gray-600">
        <span
          v-for="(tag, i) in [...(item?.tags ?? [])]"
          :key="i"
          class="rounded-lg px-2 inline-block py-1"
          :class="colors[Math.floor(Math.random() * item?.tags?.length)]"
          >{{ tag }}</span
        >
      </div>
    </div>
  </a>
</template>

<script setup>
const colors = ref([
  "bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500",
  "bg-green-400",
  "bg-red-400",
  "bg-blue-400",
  "bg-yellow-400",
  "bg-indigo-400",
  "bg-violet-400",
  "bg-rose-400",
]);
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});
</script>

<style>
</style>
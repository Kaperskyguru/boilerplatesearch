<template>
  <div
    :class="{
      'bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 p-0.5 relative':
        item?.isFeatured,
    }"
  >
    <div
      v-if="item?.isFeatured"
      class="absolute bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full"
    >
      <span>Featured</span>
    </div>
    <div class="max-w-sm border rounded-lg shadow bg-black border-gray-700">
      <div class="shadow-lg border-b border-gray-700 w-full">
        <img class="w-ful object-fll" src="~/assets/img/shipfast.png" alt="" />
      </div>
      <div class="p-5">
        <div class="flex justify-between items-center py-2">
          <div class="mb-3">
            <span class="px-4 py-1 rounded-lg border border-gray-700">{{
              item?.tags[0]
            }}</span>
            <h2 class="mt-4 mb-2 text-2xl font-bold tracking-tight text-white">
              {{ item?.title }}
            </h2>
          </div>
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

        <div class="flex justify-center items-center gap-5 py-5">
          <a
            :href="item?.url"
            class="px-4 py-1 rounded-lg border border-gray-700 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"
          >
            Visit Website
          </a>

          <a
            v-if="!item?.shouldWriteReview"
            class="hover:underline px-4 py-1 rounded-lg border border-gray-700"
            :href="item?.url"
            >Learn more</a
          >
        </div>
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
  </div>
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
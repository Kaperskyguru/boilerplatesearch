<template>
  <div class="flex rounded shadow w-full">
    <div class="w-full p-4">
      <div
        class="flex justify-between py-2 px-2 border-solid border-b border-gray-700"
      >
        <h5>Filter By</h5>
        <h5>Clear All</h5>
      </div>
      <div class="flex flex-col gap-5 py-4 px-5">
        <!-- Type -->
        <div class="flex border-solid border-b border-gray-700">
          <fieldset>
            <div class="flex flex-col gap-x-2 justify-center px-">
              <legend class="text-sm font-light uppercase leading-6">
                Tech, Tags, Keywords
              </legend>

              <div class="relative flex flex-col gap-x-3">
                <div
                  class="flex items-center gap-3 py-3"
                  v-for="(tag, i) in allTags"
                  :key="i"
                >
                  <div class="flex h-6 items-center">
                    <input
                      :id="tag"
                      :name="tag"
                      v-model="tags"
                      :value="tag"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label :for="tag" class="font-medium">{{ tag }}</label>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
const tags = ref([]);
const boilerplates = ref([]);

const emit = defineEmits(["filter", "skillPremium"]);

const { data } = await useAsyncData("allboilerplates", () =>
  queryContent("boilerplates").find()
);
boilerplates.value = data.value;

const allTags = computed(() => [
  ...new Set(
    boilerplates.value.reduce((a, c) => {
      a.push(...c.tags);
      return a;
    }, [])
  ),
]);

watch(
  () => tags.value,
  () => {
    emit("filter", {
      tags: tags.value,
    });
  },
  { deep: true }
);
</script>
  
  <style>
</style>
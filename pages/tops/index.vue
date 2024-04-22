<template>
  <main>
    <div class="container mx-auto max-w-3xl p-8 grow mt-10">
      <div>
        <div
          class="mb-8 border-dotted border-b pb-8 border-gray-300"
          v-for="article in group"
          :key="article"
        >
          <h1 class="font-bold text-4xl py-2">
            <a class="block" :href="`/tops/top-${article}-saas-boilerplates`">{{
              `Top ${article} SaaS Boilerplates (2024)`
            }}</a>
          </h1>

          <!-- <p class="excerpt">
            {{ article.description }}
          </p> -->
        </div>
      </div>
    </div>

    <div class="w-5/6 mx-auto pt-5">
      <div class="py-5">
        <h3 class="text-2xl">Top Featured Boilerplates</h3>
      </div>
      <div
        class="flex justify-start flex-col w-full lg:grid lg:grid-cols-4 gap-5 pt-5"
      >
        <Boilerplate
          :item="boilerplate"
          v-for="(boilerplate, i) in featuredBoilerplates"
          :key="i"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
const featuredBoilerplates = ref([]);
const boilerplates = await queryContent("boilerplates")
  .where({ isFeatured: true })
  .limit(4)
  .find();
featuredBoilerplates.value = boilerplates;

const allBoilerplates = await queryContent("boilerplates").find();

const group = computed(() => {
  return allBoilerplates.reduce(function (r, a) {
    const key = a.tags[0];
    r.push(key);
    return [...new Set(r)];
  }, []);
});
</script>

<style>
</style>
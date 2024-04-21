<template>
  <main>
    <div class="container mx-auto max-w-3xl p-8 grow mt-10">
      <div>
        <ContentList path="/blog" v-slot="{ list }">
          <div
            class="mb-8 border-dotted border-b pb-8 border-gray-300"
            v-for="article in list"
            :key="article._path"
          >
            <h1 class="font-bold text-4xl py-2">
              <a class="block" :href="article._path">{{ article.title }}</a>
            </h1>

            <p class="excerpt">
              {{ article.description }}
            </p>

            <a class="tag spirituality" href="/blog/tag/spirituality"
              >spirituality</a
            >

            <!-- <span
            class="block md:inline md:float-right md:pt-4 pt-2 created-date"
            datetime="Sat Oct 08 2016 19:00:00 GMT-0500 (Central Daylight Time)"
          >
            October 9, 2016
          </span> -->
          </div>
        </ContentList>
      </div>

      <!-- <div>
      <div class="md:flex justify-evenly mb-6">
        <div class="flex justify-between mx-auto w-full">
          <div class="mx-auto mb-4">
            <a class="next-page md:mb-2" href="/blog/page/2/">Previous Page</a>
          </div>
        </div>

        <div class="flex justify-between mx-auto w-full">
          <div class="mx-auto">
            <a class="last-page" href="/blog/page/2/">Last Page</a>
          </div>
        </div>
      </div>

      <p class="text-center text-sm italic mb-10">(On page 1 of 2.)</p>
    </div> -->
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
</script>

<style>
</style>
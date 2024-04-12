<template>
  <main class="container mx-auto max-w-3xl p-8 grow mt-10">
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
  </main>
</template>

<script setup>
</script>

<style>
</style>
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

            <!-- <span
            class="block md:inline md:float-right md:pt-4 pt-2 created-date"
            datetime="Sat Oct 08 2016 19:00:00 GMT-0500 (Central Daylight Time)"
          >
            October 9, 2016
          </span> -->
          </div>
        </ContentList>
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
const { data } = await useAsyncData("featuredBoilerplates", () =>
  queryContent("boilerplates").where({ isFeatured: true }).limit(4).find()
);
featuredBoilerplates.value = data.value;

useHead({
  title: `Blog - BoilerplateSearch.com`,
  meta: [
    {
      hid: "description",
      name: "description",
      content: `Discover the top ranking SaaS boilerplates for your next SaaS project and startups. What is SaaS Boilerplates?`,
    },

    {
      hid: "og:title",
      property: "og:title",
      content: `Blog - BoilerplateSearch.com`,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: `Discover the top ranking SaaS boilerplates for your next SaaS project and startups. What is SaaS Boilerplates?`,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: `/img/top.png`,
    },
    {
      hid: "og:url",
      property: "og:url",
      content: `/blog`,
    },
    {
      hid: "og:image:width",
      property: "og:image:width",
      content: "100",
    },
    {
      hid: "og:image:height",
      property: "og:image:height",
      content: "100",
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "website",
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
});
</script>

<style>
</style>
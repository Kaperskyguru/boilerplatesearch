<template>
  <main class="pt-10 pb-16 lg:pt-16 lg:pb-24 bg-black antialiased">
    <!-- <div class="mx-auto flex justify-center max-w-screen-xl">
      <header class="mb-4 pt-4 lg:mb-6 not-format">
        <h1
          class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white"
        >
          {{ `Top  SaaS Boilerplates (2024)` }}
        </h1>
        <p>
          Discover the top ranking SaaS boilerplates for your next SaaS project
          and startups. Ranking are based on lots of features such as
          Authentication, technology, clean code, key features, etc
        </p>
      </header>
    </div> -->

    <div
      class="flex justify-between px-4 mx-auto max-w-screen-xl border-b border-gray-900"
    >
      <div
        id="article"
        class="mx-auto w-full my-5 max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert"
      >
        <header class="mb2 ot-format">
          <h2
            class="mb-2 text-3xl font-extrabold leading-tight text-gray-900 lg:text-4xl dark:text-white"
          >
            {{ boilerplate.title }}
          </h2>
        </header>
        <div class="shadow-lg border-b border-gray-700 my-4 w-full h-auto">
          <img
            class="w-full h-full object-fill"
            :src="`/img/${boilerplate?.image}`"
            :alt="boilerplate?.title"
          />
        </div>

        <article v-html="boilerplate.description"></article>

        <div>
          <h2>Key Features</h2>
          <div class="flex flex-col">
            <ul>
              <li v-for="(tag, i) in boilerplate?.tags" :key="i">{{ tag }}</li>
            </ul>
          </div>
        </div>

        <div>
          <h2>Price Range</h2>
          <div class="flex flex-col text-green-500 font-bold text-xl">
            <span>
              {{ boilerplate?.price }}
            </span>
          </div>
        </div>
        <div class="py-5 text-center">
          <a
            class="py-2 px-3 rounded-lg border border-gray-700 px-2 inline-block py-1 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"
            :href="link(boilerplate?.url)"
            >Visit Website</a
          >
        </div>
      </div>
    </div>

    <div class="mt-20">
      <hr />
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
const route = useRoute();
const { data: featured } = await useAsyncData("featuredBoilerplates", () =>
  queryContent("boilerplates").where({ isFeatured: true }).limit(4).find()
);
featuredBoilerplates.value = featured.value;

const { data: boilerplate } = await useAsyncData(
  "boilerplate-" + route.params?.slug,
  () => queryContent(`boilerplates/${useRoute().params?.slug}`).findOne()
);

const link = (url) => {
  if (url?.includes("?"))
    return `${url}&utm_campaign=homepage&utm_medium=BoilerplateSearch&utm_source=boilerplatesearch.com`;
  return `${url}?utm_campaign=homepage&utm_medium=BoilerplateSearch&utm_source=boilerplatesearch.com`;
};

useHead({
  title: `${boilerplate.value?.title} SaaS Boilerplates - BoilerplateSearch`,
  meta: [
    {
      hid: "keywords",
      name: "keywords",
      content: `SaaS, SaaS boilerplates, ${boilerplate.value?.tags?.join(",")}`,
    },
    {
      hid: "description",
      name: "description",
      content: `${boilerplate.value?.description}`,
    },

    {
      hid: "og:title",
      property: "og:title",
      content: `${boilerplate.value?.title} SaaS Boilerplate - BoilerplateSearch`,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: `${boilerplate.value?.description}`,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: `/img/${boilerplate.value?.image}`,
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "article",
    },
    {
      hid: "og:url",
      property: "og:url",
      content: `/boilerplates/${useRoute().params?.slug}`,
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
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
});
</script>
    
    <style>
div#article p {
  @apply py-3 text-lg;
}

div#article h2 {
  @apply py-4 text-2xl;
}

div#article h3 {
  @apply py-3 text-xl;
}

div#article h4 {
  @apply py-2 text-lg;
}

div#article h2,
div#article h3,
div#article h4,
div#article h5,
div#article h6 {
  @apply font-bold;
}

div#article ul,
div#article ol {
  @apply list-disc px-5;
}

div#article img {
  @apply py-3;
}

div#article li {
  @apply py-1;
}
</style>
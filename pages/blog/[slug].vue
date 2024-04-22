<template>
  <main class="pt-10 pb-16 lg:pt-16 lg:pb-24 bg-black antialiased">
    <div class="flex justify-between px-4 mx-auto max-w-screen-xl">
      <ContentDoc v-slot="{ doc }">
        <article
          class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert"
        >
          <header class="mb-4 lg:mb-6 not-format">
            <h1
              class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white"
            >
              {{ doc.title }}
            </h1>
          </header>
          <ContentRenderer :value="doc" />
        </article>
      </ContentDoc>
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
const { data } = await useAsyncData(`blog/${useRoute().params?.slug}`, () =>
  queryContent(`blog/${useRoute().params?.slug}`).findOne()
);

const featuredBoilerplates = ref([]);
const boilerplates = await queryContent("boilerplates")
  .where({ isFeatured: true })
  .limit(4)
  .find();
featuredBoilerplates.value = boilerplates;

useHead({
  title: data.value?.title,
  meta: [
    {
      hid: "keywords",
      name: "keywords",
      content: `SaaS, SaaS boilerplates`,
    },
    {
      hid: "description",
      name: "description",
      content: data.value?.description,
    },

    {
      hid: "og:title",
      property: "og:title",
      content: data.value?.title,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: data.value?.description,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: `/img/blog/${data.value?.image}`,
    },
    {
      hid: "og:url",
      property: "og:url",
      content: `/blog/${useRoute().params?.slug}`,
    },
    {
      hid: "article:published_time",
      property: "article:published_time",
      content: data.value?.createdAt,
    },
    {
      hid: "article:modified_time",
      property: "article:modified_time",
      content: data.value?.updatedAt,
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "article",
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
article p {
  @apply py-3 text-lg;
}

article h2 {
  @apply py-4 text-2xl;
}

article h3 {
  @apply py-3 text-xl;
}

article h4 {
  @apply py-2 text-lg;
}

article h2,
article h3,
article h4,
article h5,
article h6 {
  @apply font-bold;
}

article ul,
article ol {
  @apply list-disc px-5;
}

article img {
  @apply py-3;
}

article li {
  @apply py-1;
}
</style>
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
  </main>
</template>

<script setup>
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
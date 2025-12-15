<template>
  <span>
   
    <main class="bg-black w-full text-white md:pt-20 pt-36">
      <div class="flex flex-col items-center justify-center pt-10">
        <div class="flex items-center">
          <!-- <div class="h-40 w-40">
          <img src="/img/logo.png" class="w-full h-full" alt="" />
        </div> -->
          <h1
            class="max-w-4xl text-center text-5xl font-bold md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"
          >
            <a href="/"> Boilerplate Search </a>
          </h1>
        </div>
        <p class="text-light-100 mt-5 max-w-xl text-center">
          A one-stop-shop for your boilerplate search for your next project.
        </p>
        <div class="flex items-center gap-1">
          <a
            class="py-3 font-bold"
            href="/blog/why-you-need-a-boilerplate-for-your-next-saas-project"
            >Why use boilerplates?
          </a>
          |
          <a class="py-3 font-bold" href="/blog"> Visit our blog</a>
          | <a class="py-3 font-bold" href="/tops">Our Top Lists</a>
        </div>
      </div>

      <slot />

      <footer class="py-20 flex justify-center">
        <p>
          Built and curated by
          <a
            class="underline text-gray-300"
            href="https://twitter.com/kaperskyguru"
            >Solomon Eseme</a
          >.
        </p>
      </footer>
    </main>
  </span>
</template>

<script setup>
</script>

<style>
</style>

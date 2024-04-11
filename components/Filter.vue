<template>
  <div class="flex rounded shadow">
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
                Tech
              </legend>

              <div class="relative flex flex-col gap-x-3">
                <div class="flex items-center gap-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="astro"
                      name="astro"
                      v-model="techs"
                      value="astro"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="astro" class="font-medium">Astro</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="vue"
                      name="vue"
                      v-model="techs"
                      value="vue"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="vue" class="font-medium">Vue</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="tailwind"
                      name="tailwind"
                      v-model="techs"
                      value="tailwind"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="tailwind" class="font-medium">Tailwind</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="swiftui"
                      name="swiftui"
                      value="swiftui"
                      v-model="techs"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="swiftui" class="font-medium">SwiftUI</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="sveltekit"
                      name="sveltekit"
                      value="svelte"
                      v-model="techs"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="sveltekit" class="font-medium">SvelteKit</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="react"
                      name="react"
                      v-model="techs"
                      value="react"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="react" class="font-medium">React</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="php"
                      name="php"
                      value="php"
                      v-model="techs"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="php" class="font-medium">PHP</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="nuxt"
                      name="nuxt"
                      v-model="techs"
                      value="nuxt"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="nuxt" class="font-medium">Nuxt</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="nextjs"
                      name="nextjs"
                      v-model="techs"
                      value="nextjs"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="nextjs" class="font-medium">NextJS</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="laravel"
                      name="laravel"
                      v-model="techs"
                      value="laravel"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="laravel" class="font-medium">Laravel</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="inertia"
                      name="inertia"
                      value="inertia"
                      v-model="techs"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="inertia" class="font-medium">Inertia.js</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="jetstream"
                      value="jetstream"
                      v-model="techs"
                      name="jetstream"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="jetstream" class="font-medium">Jetstream</label>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
        <!-- Primium -->
        <div class="flex">
          <fieldset>
            <div class="flex flex-col gap-2 items-center">
              <legend class="text-sm font-light uppercase leading-6">
                Tags, Keywords
              </legend>

              <div class="relative flex flex-col flex">
                <div class="flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="auth"
                      value="auth"
                      v-model="tags"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="auth" class="font-medium">Auth</label>
                  </div>
                </div>
                <div class="relative flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="community"
                      value="community"
                      v-model="tags"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="community" class="font-medium">Community</label>
                  </div>
                </div>

                <div class="relative flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="updates"
                      value="updates"
                      v-model="tags"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="updates" class="font-medium">Updates</label>
                  </div>
                </div>

                <div class="relative flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="stripe"
                      value="stripe"
                      v-model="tags"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="stripe" class="font-medium">Stripe</label>
                  </div>
                </div>

                <div class="relative flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="seo"
                      value="seo"
                      v-model="tags"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="seo" class="font-medium">SEO</label>
                  </div>
                </div>

                <div class="relative flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="email"
                      value="email"
                      v-model="tags"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="email" class="font-medium">Email</label>
                  </div>
                </div>

                <div class="relative flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="database"
                      value="database"
                      v-model="tags"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="database" class="font-medium">Database</label>
                  </div>
                </div>

                <div class="relative flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="components"
                      value="components"
                      v-model="tags"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="components" class="font-medium"
                      >Components</label
                    >
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
const techs = ref([]);
const tags = ref([]);

const emit = defineEmits(["filter", "skillPremium"]);

watch(
  () => techs.value,
  () => {
    emit("filter", {
      tech: techs.value,
      tags: tags.value,
    });
  },
  { deep: true }
);

watch(
  () => tags.value,
  () => {
    emit("filter", {
      tech: techs.value,
      tags: tags.value,
    });
  },
  { deep: true }
);
</script>
  
  <style>
</style>
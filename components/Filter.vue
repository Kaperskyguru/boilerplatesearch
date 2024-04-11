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
                      id="beginners"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      value="beginners"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="beginners" class="font-medium">Astro</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="intermediate"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      value="intermediate"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="intermediate" class="font-medium">Vue</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="intermediate"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      value="intermediate"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="intermediate" class="font-medium"
                      >Tailwind</label
                    >
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="intermediate"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      value="intermediate"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="intermediate" class="font-medium"
                      >SwiftUI</label
                    >
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="intermediate"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      value="intermediate"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="intermediate" class="font-medium"
                      >SvelteKit</label
                    >
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="intermediate"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      value="intermediate"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="intermediate" class="font-medium">React</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="intermediate"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      value="intermediate"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="intermediate" class="font-medium">PHP</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="intermediate"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      value="intermediate"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="intermediate" class="font-medium">Nuxt</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="intermediate"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      value="intermediate"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="intermediate" class="font-medium">NextJS</label>
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="intermediate"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      value="intermediate"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="intermediate" class="font-medium"
                      >Laravel</label
                    >
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="intermediate"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      value="intermediate"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="intermediate" class="font-medium"
                      >Inertia.js</label
                    >
                  </div>
                </div>
                <div class="relative flex gap-x-3 py-3">
                  <div class="flex h-6 items-center">
                    <input
                      id="advanced"
                      value="advanced"
                      name="level"
                      @change="onSkillFilter"
                      v-model="skill"
                      type="radio"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="advanced" class="font-medium">Jetstream</label>
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
                      id="free"
                      value="free"
                      name="premium"
                      v-model="free"
                      @change="onFreeFilter"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="free" class="font-medium">Auth</label>
                  </div>
                </div>
                <div class="relative flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="paid"
                      value="paid"
                      name="premium"
                      @change="onPaidFilter"
                      v-model="premium"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="paid" class="font-medium">Community</label>
                  </div>
                </div>

                <div class="relative flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="paid"
                      value="paid"
                      name="premium"
                      @change="onPaidFilter"
                      v-model="premium"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="paid" class="font-medium">Updates</label>
                  </div>
                </div>

                <div class="relative flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="paid"
                      value="paid"
                      name="premium"
                      @change="onPaidFilter"
                      v-model="premium"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="paid" class="font-medium">Stripe</label>
                  </div>
                </div>

                <div class="relative flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="paid"
                      value="paid"
                      name="premium"
                      @change="onPaidFilter"
                      v-model="premium"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="paid" class="font-medium">SEO</label>
                  </div>
                </div>

                <div class="relative flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="paid"
                      value="paid"
                      name="premium"
                      @change="onPaidFilter"
                      v-model="premium"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="paid" class="font-medium">Email</label>
                  </div>
                </div>

                <div class="relative flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="paid"
                      value="paid"
                      name="premium"
                      @change="onPaidFilter"
                      v-model="premium"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="paid" class="font-medium">Database</label>
                  </div>
                </div>

                <div class="relative flex gap-3 py-2">
                  <div class="flex h-6 items-center">
                    <input
                      id="paid"
                      value="paid"
                      name="premium"
                      @change="onPaidFilter"
                      v-model="premium"
                      type="checkbox"
                      class="h-4 w-4 rounded border border-solid border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="paid" class="font-medium">Components</label>
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
const skill = ref("");
const premium = ref("");
const free = ref("");

const emit = defineEmits(["skillFilter", "skillPremium"]);

function onSkillFilter() {
  emit("skillFilter", {
    skill: skill.value,
  });
}

function onPaidFilter() {
  emit("skillPremium", {
    paid: premium.value,
  });
}

function onFreeFilter() {
  emit("skillPremium", {
    free: free.value,
  });
}
</script>
  
  <style>
</style>
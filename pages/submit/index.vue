<template>
  <div class="w-full py-10">
    <div class="mx-auto max-w-2xl px-4">
      <h2 class="text-3xl font-bold text-center">Submit a Boilerplate</h2>
      <p class="text-gray-400 text-center mt-3">
        Fill in your boilerplate details and pay once. Your listing goes live
        automatically a few minutes after payment.
      </p>

      <p v-if="optionsError" class="mt-8 p-4 border border-red-500 rounded-lg text-red-400">
        Submissions are unavailable right now. Please try again later.
      </p>

      <form v-else class="mt-8 flex flex-col gap-5" @submit.prevent="submit">
        <fieldset class="flex flex-col gap-3">
          <legend class="font-bold mb-2">Plan</legend>
          <label
            v-for="tier in tiers"
            :key="tier.id"
            class="flex items-center justify-between gap-3 p-4 rounded-lg border cursor-pointer"
            :class="form.tier === tier.id ? 'border-fuchsia-500' : 'border-gray-700'"
          >
            <span class="flex items-center gap-3">
              <input v-model="form.tier" type="radio" name="tier" :value="tier.id" />
              <span>
                <span class="font-bold">{{ tier.name }}</span>
                <span class="block text-sm text-gray-400">
                  {{ tier.id === "featured" ? "Listed at the top with a Featured badge" : "Listed in the directory" }}
                </span>
              </span>
            </span>
            <span class="text-xl text-green-500">{{ tier.price }}</span>
          </label>
        </fieldset>

        <label class="flex flex-col gap-2">
          <span class="font-bold">Boilerplate name</span>
          <input v-model="form.title" required maxlength="60" class="field" placeholder="ShipFast" />
        </label>

        <label class="flex flex-col gap-2">
          <span class="font-bold">Website URL</span>
          <input v-model="form.url" required type="url" maxlength="300" class="field" placeholder="https://example.com" />
        </label>

        <label class="flex flex-col gap-2">
          <span class="font-bold">Description</span>
          <textarea v-model="form.description" required minlength="20" maxlength="300" rows="4" class="field" />
          <span class="text-sm text-gray-400">{{ form.description.length }}/300</span>
        </label>

        <label class="flex flex-col gap-2">
          <span class="font-bold">Price of your boilerplate</span>
          <input v-model="form.price" required maxlength="30" class="field" placeholder="$199 or Free" />
        </label>

        <label class="flex flex-col gap-2">
          <span class="font-bold">Tags</span>
          <input v-model="form.tags" required class="field" placeholder="Next.js, Stripe, Tailwind CSS" />
          <span class="text-sm text-gray-400">Comma separated, up to 10. The first tag shows on the card.</span>
        </label>

        <label class="flex flex-col gap-2">
          <span class="font-bold">Card image</span>
          <input
            ref="imageInput"
            required
            type="file"
            accept="image/png,image/jpeg,image/webp"
            class="field"
            @change="onImage"
          />
          <span class="text-sm text-gray-400">PNG, JPG or WebP, max 2 MB. Landscape works best.</span>
          <img v-if="preview" :src="preview" alt="Preview" class="mt-2 w-full max-w-sm h-52 object-fill border border-gray-700 rounded-lg" />
        </label>

        <label class="flex flex-col gap-2">
          <span class="font-bold">Your email</span>
          <input v-model="form.email" required type="email" maxlength="200" class="field" placeholder="you@example.com" />
          <span class="text-sm text-gray-400">For your receipt.</span>
        </label>

        <p v-if="error" class="p-4 border border-red-500 rounded-lg text-red-400">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading || !tiers.length"
          class="px-4 py-3 rounded-lg font-bold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 disabled:opacity-50"
        >
          {{ loading ? "Starting checkout…" : `Continue to payment${selectedPrice ? ` (${selectedPrice})` : ""}` }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
useHead({ title: "Submit a Boilerplate | Boilerplate Search" });

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

const { data: options, error: optionsError } = await useFetch("/api/submit/options");
const tiers = computed(() => options.value?.tiers ?? []);

const form = reactive({
  tier: "listing",
  title: "",
  url: "",
  description: "",
  price: "",
  tags: "",
  email: "",
});
const image = ref(null);
const preview = ref("");
const error = ref("");
const loading = ref(false);

const selectedPrice = computed(() => tiers.value.find((t) => t.id === form.tier)?.price);

function onImage(e) {
  const file = e.target.files?.[0] ?? null;
  error.value = "";
  if (preview.value) URL.revokeObjectURL(preview.value);
  preview.value = "";
  image.value = null;
  if (!file) return;
  if (file.size > MAX_IMAGE_BYTES) {
    error.value = "Image must be 2 MB or smaller.";
    e.target.value = "";
    return;
  }
  image.value = file;
  preview.value = URL.createObjectURL(file);
}

async function submit() {
  error.value = "";
  if (!image.value) {
    error.value = "Upload an image.";
    return;
  }
  const body = new FormData();
  for (const [key, value] of Object.entries(form)) body.append(key, value);
  body.append("image", image.value);

  loading.value = true;
  try {
    const { url } = await $fetch("/api/submit", { method: "POST", body });
    window.location.href = url;
  } catch (err) {
    error.value = err?.data?.statusMessage || err?.statusMessage || "Something went wrong. Please try again.";
    loading.value = false;
  }
}
</script>

<style scoped>
.field {
  @apply p-3 rounded-lg bg-black border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-fuchsia-500;
}
</style>

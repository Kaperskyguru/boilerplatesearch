<template>
  <div class="w-full py-20">
    <div class="mx-auto max-w-xl px-4 text-center">
      <h2 class="text-3xl font-bold">Payment received 🎉</h2>
      <p class="text-gray-400 mt-4">
        Thanks! Your boilerplate is being added to Boilerplate Search and will
        be live in a few minutes. Your receipt is on its way to your email.
      </p>
      <a
        href="/"
        class="inline-block mt-8 px-4 py-3 rounded-lg font-bold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"
      >
        Back to all boilerplates
      </a>
    </div>
  </div>
</template>

<script setup>
useHead({ title: "Payment received | Boilerplate Search" });
</script>

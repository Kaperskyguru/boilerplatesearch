<template>
  <div class="w-full">
    <!-- Search -->
    <div class="mx-auto w-2/3">
      <div class="py-10 mx-auto w-11/12">
        <form class="max-w-md w-full mx-auto">
          <div
            class="relative bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 m-4 p-1 rounded-full max-w-sm"
          >
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="default-search"
              v-model="search"
              class="block p-3 !w-full rounded-full focus:outline-none w-full p-4 ps-10 text-sm border rounded-full bg-black border-gray-600 placeholder-white text-white"
              placeholder="Search boilerplates"
            />
          </div>
        </form>
      </div>
    </div>

    <div class="w-ful shadow bg-black py-5">
      <div class="fle w-full">
        <div class="w-11/12 mx-auto pt-5">
          <div class="flex lg:flex-row md:flex-row flex-col w-full gap-10">
            <div
              class="w-full md:w-1/3 lg:w-1/5 h-full bg-black border border-gray-700 text-white"
            >
              <Filter @filter="onFilter" />
            </div>
            <div>
              <div
                class="flex justify-between md:flex-col flex-row lg:flex-row gap-5 pb-5"
              >
                <div>
                  <h2 class="font-blod text-2xl uppercase">
                    <p class="capitalize">
                      All Boilerplates with "{{ $route.params?.slug }}" tag
                    </p>
                  </h2>
                </div>
                <button
                  data-tally-open="3xpAZ9"
                  data-tally-emoji-text="👋"
                  data-tally-emoji-animation="wave"
                  data-tally-auto-close="1000"
                  class="px-4 py-3 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500"
                >
                  Submit a Boilerplate
                </button>
              </div>

              <div
                class="flex justify-start flex-col w-full lg:grid lg:grid-cols-3 gap-5 pt-5"
              >
                <Boilerplate
                  :item="boilerplate"
                  v-for="(boilerplate, i) in featured"
                  :key="i"
                />
                <Boilerplate
                  :item="boilerplate"
                  v-for="(boilerplate, i) in notFeatured"
                  :key="i"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import Boilerplate from "../components/Boilerplate.vue";
const boilerplates = ref([]);
const search = ref("");

const tag = computed(() => {
  const tag = useRoute().params?.slug?.replaceAll("-", " ");
  return tag.replaceAll("and", "&");
});

async function allBoilerplates() {
  const { data } = await useAsyncData("boilerplates-" + tag.value, () =>
    queryContent("boilerplates")
      .where({ tags: { $icontains: useRoute().params?.slug } })
      .find()
  );

  boilerplates.value = data.value;
}

await allBoilerplates();

const featured = computed(() => boilerplates.value.filter((b) => b.isFeatured));
const notFeatured = computed(() =>
  boilerplates.value.filter((b) => !b.isFeatured)
);
function onFilter(filter) {
  console.log(filter);
}

useHead({
  title: `Top Best "${
    useRoute().params?.slug
  }" SaaS Boilerplates (${new Date().getFullYear()})`,
  meta: [
    {
      hid: "keywords",
      name: "keywords",
      content: `Boilerplates, SaaS Boilerplate, top SaaS Boilerplates, Best SaaS Boilerplates`,
    },
    {
      hid: "description",
      name: "description",
      content: `Top best ${
        useRoute().params?.slug
      } SaaS Boilerplates (${new Date().getFullYear()})`,
    },

    {
      hid: "og:title",
      property: "og:title",
      content: `Top Best "${
        useRoute().params?.slug
      }" SaaS Boilerplates (${new Date().getFullYear()})`,
    },
    {
      hid: "og:description",
      property: "og:description",
      content: `Top best ${
        useRoute().params?.slug
      } SaaS Boilerplates (${new Date().getFullYear()})`,
    },
    // {
    //   hid: "og:image",
    //   property: "og:image",
    //   content: `https://res.cloudinary.com/kaperskydisk/image/upload/v1710945111/Get%20Backend%20Jobs/hero.png`,
    // },
    {
      hid: "og:url",
      property: "og:url",
      content: `/${useRoute().params?.slug}`,
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
.search .tabs-component-tabs .tabs-component-tab {
  padding: 0 1rem !important;
}

.search .tabs-component-tabs {
  /* background: white !important; */
  display: flex;
  justify-content: flex-center !important;
  padding: 0 4rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}
</style>
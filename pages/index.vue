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

    <tabs
      class="search shadow py-10 flex-row"
      :options="{ defaultTabHash: 'all', useUrlFragment: true }"
      cache-lifetime="0"
    >
      <tab id="all" :name="`All (${boilerplates?.length})`">
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
                      <h2 class="font-blod text-2xl">All Boilerplates</h2>
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
                      v-for="(boilerplate, i) in featuredBoilerplates"
                      :key="i"
                    />
                    <Boilerplate
                      :item="boilerplate"
                      v-for="(boilerplate, i) in boilerplates"
                      :key="i"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab>
      <tab id="latest" :name="`Latest (${boilerplates?.length})`">
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
                      <h2 class="font-blod text-2xl">Latest Boilerplates</h2>
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
                      v-for="(boilerplate, i) in featuredBoilerplates"
                      :key="i"
                    />
                    <Boilerplate
                      :item="boilerplate"
                      v-for="(boilerplate, i) in boilerplates"
                      :key="i"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab>
      <tab id="popular" :name="`Popular (${popular?.length})`">
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
                      <h2 class="font-blod text-2xl">Popular Boilerplates</h2>
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
                      v-for="(boilerplate, i) in featuredBoilerplates"
                      :key="i"
                    />
                    <Boilerplate
                      :item="boilerplate"
                      v-for="(boilerplate, i) in popular"
                      :key="i"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab>
      <tab id="trending" :name="`Trending (${trending?.length})`">
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
                    class="flex justify-between gap-5 md:flex-col flex-row lg:flex-row pb-5"
                  >
                    <div>
                      <h2 class="font-blod text-2xl">Trending Boilerplates</h2>
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
                      v-for="(boilerplate, i) in featuredBoilerplates"
                      :key="i"
                    />
                    <Boilerplate
                      :item="boilerplate"
                      v-for="(boilerplate, i) in trending"
                      :key="i"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab>
    </tabs>
  </div>
</template>

<script setup>
import Boilerplate from "../components/Boilerplate.vue";
const boilerplates = ref([]);
const featuredBoilerplates = ref([]);
const trending = ref([]);
const popular = ref([]);
const search = ref("");

async function allBoilerplates() {
  const all = await queryContent("boilerplates")
    .where({ isFeatured: false })
    .find();
  boilerplates.value = all;
}

async function trendingBoilerplates() {
  const all = await queryContent("boilerplates")
    .where({ isTrending: true, isFeatured: false })
    .find();
  trending.value = all;
}

async function popularBoilerplates() {
  const all = await queryContent("boilerplates")
    .where({ isPopular: true, isFeatured: false })
    .find();
  popular.value = all;
}

const featured = async () => {
  const boilerplates = await queryContent("boilerplates")
    .where({ isFeatured: true })
    .find();
  featuredBoilerplates.value = boilerplates;
};

await featured();
await allBoilerplates();
await trendingBoilerplates();
await popularBoilerplates();

function onFilter(filter) {
  console.log(filter);
}
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
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  ssr: true,

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "SaaS Boilerplates: Discover over 150+ top SaaS Boilerplates",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Discover The Best SaaS Boilerplate For Your Next Project. Discover A Curated Collection Of Top SaaS Boilerplates and Starter Kits",
        },

        {
          hid: "keywords",
          name: "keywords",
          content: `SaaS, SaaS boilerplates, Open Source boilerplate, Next.js boilerplate, Top boilerplates, best boilerplates, most used boilerplates, popular boilerplates`,
        },

        {
          hid: "og:title",
          property: "og:title",
          content: `SaaS Boilerplates: Discover over 150+ top SaaS Boilerplates`,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: `Discover The Best SaaS Boilerplate For Your Next Project. Discover A Curated Collection Of Top SaaS Boilerplates and Starter Kits`,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: `/img/top.png`,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `https://boilerplatesearch.com`,
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
          hid: "twitter:creator",
          property: "twitter:creator",
          content: "@kaperskyguru",
        },

        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [
        // {
        //   type: "application/ld+json",
        //   textContent: {
        //     "@context": "http://schema.org",
        //     "@graph": [
        //       {
        //         "@type": "WebPage",
        //         author: { "@id": "#identity" },
        //         copyrightHolder: { "@id": "#identity" },
        //         copyrightYear: new Date(),
        //         creator: { "@id": "#creator" },
        //         dateModified: new Date(),
        //         datePublished: "2019-06-06T10:10:00-07:00",
        //         description:
        //           "Looking for a backend engineering job? Get Backend Jobs is the #1 Backend Engineering Job Board and has 50,000+ backend jobs as a Backend Developer, Backend Engineer, Remote Backend Engineer, Remote Backend Software Developer, Remote Backend Software Engineer and more! Find your backend engineering career where you can work remotely from anywhere.",
        //         headline: "Get Backend Jobs",
        //         image: {
        //           "@type": "ImageObject",
        //           url: "/logo.png",
        //         },
        //         inLanguage: "en-us",
        //         mainEntityOfPage: "https://getbackendjobs.com/",
        //         name: "Get Backend Jobs",
        //         publisher: { "@id": "#creator" },
        //         url: "https://getbackendjobs.com",
        //       },
        //       { "@id": "#identity", "@type": "LocalBusiness", priceRange: "$" },
        //       { "@id": "#creator", "@type": "Organization" },
        //       {
        //         "@type": "BreadcrumbList",
        //         description: "Breadcrumbs list",
        //         itemListElement: [
        //           {
        //             "@type": "ListItem",
        //             item: "https://getbackendjobs.com/",
        //             name: "Tailored Backend Jobs",
        //             position: 1,
        //           },
        //           {
        //             "@type": "ListItem",
        //             item: "https://getbackendjobs.com/categories/remote",
        //             name: "Remote Backend Jobs",
        //             position: 2,
        //           },
        //           {
        //             "@type": "ListItem",
        //             item: "https://getbackendjobs.com/signup",
        //             name: "Job Application Tracker & CRM",
        //             position: 3,
        //           },
        //           {
        //             "@type": "ListItem",
        //             item: "https://getbackendjobs.com/signup",
        //             name: "Application Streak",
        //             position: 4,
        //           },
        //         ],
        //         name: "Breadcrumbs",
        //       },
        //     ],
        //   },
        // },
      ],
    },
  },

  content: {
    // ... options
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@nuxt/content"],
});

export default defineNitroPlugin((nitroApp: any) => {
  //   if (process.env.NODE_ENV == "development") return;
  nitroApp.hooks.hook("render:html", (html: any, { event }: any) => {
    html.head.push(`
    
      <script async src="https://tally.so/widgets/embed.js"></script>

      <script defer data-domain="boilerplatesearch.netlify.app" src="https://plausible.io/js/script.js"></script>

      `);
  });
});

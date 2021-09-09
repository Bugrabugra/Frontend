export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Storkyblok + Next = <3',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'An awesome blog about tech stuff, built with Nuxt and Storyblok' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700"}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      "storyblok-nuxt",
      {
        accessToken: "Gci5k1CPBtcgnCJDAzBNPgtt",
        cacheProvider: "memory"
      }
      ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

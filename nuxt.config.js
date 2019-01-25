const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/styles/styles.css'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ['~/plugins/axios'],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: 'https://api.quwi.com/v2/'
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'auth/signup',
            method: 'post'
          },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/users/profile', method: 'get', propertyName: 'user' }
        }
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      home: '/home',
      callback: '/'
    },
    watchLoggedIn: true,
    rewriteRedirects: true
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}

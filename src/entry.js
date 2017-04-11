// import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'
import mixins from './mixins'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'

// import Mock from './mock'
// Mock.bootstrap();

// import 'font-awesome/css/font-awesome.min.css'

// Vue.use(ElementUI)

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)

// create the app instance.
// here we inject the router and store to all child components,
// making them available everywhere as `this.$router` and `this.$store`.
new Vue(Vue.util.extend({ el: '#root', router, store }, App))

router.push('/')

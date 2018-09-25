import Vue from 'vue'
import App from './home/App.vue'
import Body from './home/Body.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.component('home-body', Body)
new Vue({
  el: '#app',
  render: h => h(App)
})

import Vue from 'vue';
import 'vue-material/dist/theme/default.css';
import 'vue-material/dist/vue-material.min.css';
import './styles/styles.css';
import VueNativeSock from 'vue-native-websocket';
import App from './App.vue';
import store from './store';
import VueMaterial from 'vue-material';


Vue.use(VueNativeSock, 'ws://localhost:3000', { store });
Vue.config.productionTip = false;



Vue.use(VueMaterial);


new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

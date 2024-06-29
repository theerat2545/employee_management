import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify'; // การตั้งค่า Vuetify
import { loadFonts } from './plugins/webfontloader'; // การใช้ Web Font Loader ถ้ามี

loadFonts();

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount('#app');

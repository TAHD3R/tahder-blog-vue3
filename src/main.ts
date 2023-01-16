import { createApp } from 'vue';
import App from './App.vue';
import VueVditor from 'vue-vditor';
import router from './router';
import pinia from './store';

import 'normalize.css/normalize.css';
import './tailwind.css';
import 'vditor/dist/index.css';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueVditor);

app.mount('#app');

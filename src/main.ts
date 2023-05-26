import { churchtoolsClient } from '@churchtools/churchtools-client';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import VueKonva from 'vue-konva';
import App from './App.vue';
import { router } from './router';
import './style.css';

import Band from './layouts/Band.vue';
import Countdown1 from './layouts/Countdown1.vue';
import Donation from './layouts/Donation.vue';
import Image from './layouts/Image.vue';
import Instagram from './layouts/Instagram.vue';
import NextSundays from './layouts/NextSundays.vue';
import Podcast from './layouts/Podcast.vue';
import QRCode from './layouts/QRCode.vue';
import Text from './layouts/Text.vue';
import Title from './layouts/Title.vue';

declare const window: Window &
    typeof globalThis & {
        settings: {
            base_url?: string;
        };
    };

const baseUrl = window.settings?.base_url ?? import.meta.env.VITE_BASE_URL;
churchtoolsClient.setBaseUrl(baseUrl);

const app = createApp(App);
const pinia = createPinia();

app.use(VueKonva);
app.use(pinia);
app.use(router);

app.component('Countdown1', Countdown1);
app.component('NextSundays', NextSundays);
app.component('QRCode', QRCode);
app.component('Text', Text);
app.component('Donation', Donation);
app.component('Image', Image);
app.component('Band', Band);
app.component('Instagram', Instagram);
app.component('Title', Title);
app.component('Podcast', Podcast);

app.mount('#app');

const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;
if (import.meta.env.MODE === 'development' && username && password) {
    await churchtoolsClient.post('/login', { username, password });
}

const KEY = import.meta.env.VITE_KEY;
export { KEY };

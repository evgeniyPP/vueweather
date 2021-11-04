import { createApp } from 'vue';
import debounce from './directives/debounce';
import App from './App.vue';

const app = createApp(App);

app.directive('debounce', (el: HTMLElement, binding: any) => debounce(el, binding));

app.mount('#app');

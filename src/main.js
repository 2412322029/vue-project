import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
VueMarkdownEditor.use(
    vuepressTheme, {
        Prism,
    }
);


const app = createApp(App)
app.use(router)
app.use(VueMarkdownEditor);
app.mount('#app')

export const testapi="http://localhost:8080/demo_war_exploded/"
if(localStorage.getItem("api")!=null){
    var wwapi=localStorage.getItem("api")
}else{
    wwapi=testapi;
}
export const api = wwapi;

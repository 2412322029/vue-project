import { createRouter, createWebHashHistory } from "vue-router"

import home from "../views/home.vue"
import about from "../views/about.vue"
import Notfound from "../views/404.vue"
import p from "../views/p.vue"
import login from "../views/login.vue"
import admin from "../views/admin.vue"
import edit from "../views/edit.vue"
import setting from "../views/setting.vue"

const routes = [
    {
        path: '/', component: home,

    },
    { path: '/p/:pid', component: p },
    { path: '/about', component: about },
    { path: '/admin', component: admin },
    { path: '/edit/:pid', component: edit },
    { path: '/login', component: login },
    { path: '/setting', component: setting },
    { path: '/:path(.*)', component: Notfound },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router
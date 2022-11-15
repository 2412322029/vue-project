import { createRouter, createWebHashHistory } from "vue-router"

const home = () => import("../views/home.vue")
const about = () => import("../views/about.vue")
const user = () => import("../views/user.vue")
const Notfound = () => import("../views/404.vue")
const p = () => import("../views/p.vue")

const routes = [
    {
        path: '/', component: home,
        children: [{
            path: 'p/:pid',
            component: p,
        }
        ]
    },
    { path: '/about', component: about },
    { path: '/user/:id(\\d+)', component: user },
    { path: '/:path(.*)', component: Notfound },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router
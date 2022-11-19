<script>
import { api } from '../main';
export default {

    data() {
        return {
            data: "",
            msg: "",
            last: "0"
        }
    },
    methods: {
        getw() {
            this.msg = "loading"
            fetch(api + "getalldetail")
                .then(response => response.json())
                .then(r => {
                    this.data = r
                    localStorage.setItem("home", JSON.stringify(this.data))
                    this.msg = ""
                })
                .catch(e => this.msg = "Oops, error" + e)
        },
        getlasttime() {
            fetch(api + "getlast")
                .then(response => response.json())
                .then(r => {
                    this.last = r.time
                    this.msg = ""
                    if (JSON.stringify(this.last) != localStorage.getItem("last")) {
                        this.refresh()
                        console.log("刷新");
                    }
                    localStorage.setItem("last", JSON.stringify(this.last))
                })
                .catch(e => this.msg = "Oops, error,获取更新信息失败" + e)
        },
        refresh() {
            localStorage.removeItem('home')
            this.getw()
        }

    },
    created() {
        this.getlasttime()
        if (localStorage.getItem("home") == null || localStorage.getItem("home") == "") {
            this.getw()
        } else {
            this.data = JSON.parse(localStorage.getItem("home"))
        }

    },
    watch: {
    }
}
</script>
<template>
    <h3 style="color:red;" v-show="msg != ''">{{ msg }}</h3>
    <button @click="refresh">刷新数据</button>
    <div>
        <p v-for="i in data">

        <h2 id="title">
            <router-link :to="'/p/' + i.dataId">
                {{ i.title }}</router-link>
            --
            <span id="posttime">
                {{ i.postTime }}
            </span>
            <span id="uid">
                -{{ i.userId }}
            </span>
        </h2>

        <p v-html="i.content"></p>



        </p>
    </div>
    <router-view></router-view>
</template>

<style>
#posttime {
    font-size: 12px;
}

#uid {
    font-size: 12px;
}

#title {
    text-align: center;
}
</style>
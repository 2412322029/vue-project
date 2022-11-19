<template>
    admin
    <button @click="logout">注销</button>
    <router-link id="newpost" to="/edit/new">add post</router-link>
    <table>
        <thead>
            <th>
                pid
            </th>
            <th>
                标题
            </th>
            <th>
                内容
            </th>
            <th>
                日期
            </th>
            <th>
                uid
            </th>
            <th>
                操作
            </th>
        </thead>
        <tr v-for="i in data">
            <th>
                {{ i.dataId }}
            </th>
            <th>
                <router-link :to="'/p/' + i.dataId">
                    {{ i.title }}</router-link>
            </th>
            <th>
                <p v-html="i.content.slice(0, 10) + '...'"></p>
            </th>
            <th>
                {{ i.postTime }}
            </th>

            <th>
                {{ i.userId }}
            </th>

            <th>
                <router-link :to="'/edit/' + i.dataId">
                    编辑</router-link>
                <button  @click="deletef(i.dataId)" type="button" id="del">删除</button>
            </th>


        </tr>
    </table>
</template>
<script>
import { useRouter } from 'vue-router'
import { getCurrentInstance } from "vue";
import { api } from '../main';
export default {
    data() {
        return {
            data: "",
            msg: "",
            last: "0",
        };
    },
    created() {
        
        var router = useRouter()
        const state = {
            username: null, //用户名
            password: null, //密码
        }
        if (localStorage.getItem('username')) {
            state.username = localStorage.getItem('username')
            state.password = localStorage.getItem('password')
            this.getchach()
            console.log("1");
        }
        if (state.username === null || state.password === null) {
            router.push("/login")
            alert('未登录')
        }
        return state
    },
    methods: {
        logout() {
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            location.hash = '#/login'
        },
        getchach() {
            if (localStorage.getItem("home") != null && localStorage.getItem("home") != "") {
                this.data = JSON.parse(localStorage.getItem("home"))
            }
        },
        deletef(id) {
            fetch(api + "delete?id=" + id
                + "&username=" + localStorage.getItem("username")
                + "&password=" + localStorage.getItem("password")
            )
                .then(response => {
                    if (response.status == 200) {
                    } else {
                        alert(response.status + "错误")
                    }
                    return response
                }).then((r) => {
                    return r.text()
                }).then((result) => {
                    location.hash = '#/'
                    alert(result+"，请刷新数据")
                })
                .catch(e => alert("Oops, error" + e))
        },

    }
}

</script>
<style>
a#newpost {
    padding: 31px;
}
#del{
    padding:5px;
    margin: 5px;
}
</style>
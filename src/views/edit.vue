<template>
    <div id="uname">

        <button type="button" @click="this.$router.go(-1)">返回</button>
        <label for="ptitle">标题：</label>
        <input type="text" v-model="title" id="ptitle">
        <span class="lastsave" v-show="p == 'new'">最后保存于{{ lastsave }}</span>
        <span id="dbtime">创建者id={{ uid }},pid={{ p }}
            <span class="lastsave" v-show="p != 'new'">数据库记录保存时间:{{ dbtime }}</span>
        </span>

    </div>

    <v-md-editor v-model="text" height="600px"
        left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | sync  customToolbar2 | customToolbar"
        :toolbar="toolbar">

    </v-md-editor>

</template>
<script>
import { useRouter } from 'vue-router'
import { api } from '../main';
export default {
    data() {
        let self = this
        return {
            text: "",
            title: "",
            lastsave: "",
            dbtime: "",
            uid: "",
            p: this.$route.params.pid,
            toolbar: {
                customToolbar: {
                    icon: 'v-md-icon-tip',
                    title: '发表',
                    action() {
                        if (self.p == "new") {
                            self.insert()
                            console.log("发表insert");
                        }else{
                            self.update()
                            console.log("发表更新");
                        }
                        self.refresh();

                        
                    },

                },
                customToolbar2: {
                    icon: 'v-md-icon-save',
                    title: '保存为草稿',
                    action() {
                        if (self.p == "new") {
                            self.sava(self.p)
                        } else {
                            alert("新文章才可以保存草稿")
                        }
                    },
                },
                sync: {
                    icon: 'v-md-icon-sync',
                    title: '恢复草稿',
                    action() {
                        self.reloaddaft(self.p)
                    },
                }
            },

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
        }
        if (state.username === null || state.password === null) {
            router.push("/login")
            alert('未登录')
        }
        return state
    },
    methods: {
        sava(flag) {
            if (!isNaN(parseFloat(flag)) && isFinite(flag) || flag == "new") {
                if (this.title != "" && this.text != "") {
                    localStorage.setItem("ptitle-" + flag, String(this.title))
                    localStorage.setItem("pcontent-" + flag, String(this.text))
                    var now = new Date();
                    var year = now.getFullYear(); //得到年份
                    var month = now.getMonth() + 1;//得到月份
                    var date = now.getDate();//得到日期
                    var hour = now.getHours();//得到小时数
                    var minute = now.getMinutes();//得到分钟数
                    var second = now.getSeconds();
                    this.lastsave = [year, month, date].join("-") + " " + [hour, minute, second].join(":")
                    localStorage.setItem("lastsave-" + flag, String(this.lastsave))
                    console.log("已经保存" + this.p);
                } else {
                    alert("无内容")
                }
            } else {
                alert("路径错误")
            }
        },
        reloaddaft(flag) {
            if (localStorage.getItem("ptitle-" + flag)) {
                this.title = localStorage.getItem("ptitle-" + flag)
                this.text = localStorage.getItem("pcontent-" + flag)
            } else {
                alert("无草稿")
            }
            if (localStorage.getItem("lastsave-" + flag)) {
                this.lastsave = localStorage.getItem("lastsave-" + flag)
            }
        },
        loading() {
            this.text = "loading..."
            fetch(api + "getonedetail?id=" + this.p)
                .then(response => {
                    if (response.status == 200) {
                        return response.json()
                    } else {
                        this.text = response.status + "错误"
                    }
                }).then((r) => {
                    if (this.text != null) {
                        this.text = r.content
                        this.title = r.title
                        this.dbtime = r.postTime
                        this.uid = r.userId
                    } else {
                        this.text = "查询为空"
                    }
                })
                .catch(e => this.msg = "Oops, error" + e)
        },
        update() {
            fetch(api + "update?dataid=" + this.p + "&title=" + this.title + "&content=" + this.text
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
                    alert(result)
                    
                })
                .catch(e => this.msg = "Oops, error" + e)
        },
        insert(){fetch(api + "insertdata?title=" + this.title + "&content=" + this.text
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
                    alert(result)
                })
                .catch(e => this.msg = "Oops, error" + e)
        },
        refresh() {
            localStorage.removeItem('home')
            location.hash = '#/'
        },
    },
    mounted() {
        if (localStorage.getItem("lastsave-" + this.$route.params.pid)) {
            this.lastsave = localStorage.getItem("lastsave-" + this.$route.params.pid)
        }
        if (this.$route.params.pid != "new") {
            this.loading()
        }
        if (this.$route.params.pid == "new") {
            this.reloaddaft(this.$route.params.pid)
        }
    },
    beforeUnmount() {
        if (this.text != "" && this.title != "") {
            if (this.$route.params.pid == "new") {
                this.sava("new")
            }
        }
    }

}

</script>
<style>
.v-md-editor * {
    font-family: none;
}

#ptitle {
    text-align: left;
    border-radius: 0;
    height: 27px;
    box-shadow: none;
    margin: 10px;
}

.lastsave {
    float: right;
}
</style>
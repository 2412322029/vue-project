<template>

  <!-- 登录页头部 start -->
  <div class="login-top">
    <div class="title-name">Hello Griseo</div>
  </div>
  <!-- 登录页头部 end -->
  <!-- 登录页面主体 start -->
  <div class="login-body">
    <!-- 用户名 -->
    <div class="field">
      <input type="text" placeholder="请输入用户名" v-model="username" />
    </div>
    <!-- 密码 -->
    <div class="field">
      <input type="password" placeholder="请输入密码" v-model="password" @keyup.enter.native="login"/>
    </div>
    <!-- 登录按钮 -->
    <button class="login" @click="login" >登录</button>
  </div>
</template>
<script>

import { onMounted, reactive, toRefs } from 'vue'
import { api } from '../main';
import { useRouter } from 'vue-router'
export default {
  name: 'app',
  setup() {
    const state = reactive({
      username: null, //用户名
      password: null, //密码
      msg: "",
    })
    const router = useRouter()
    // 页面初始化时，赋值用户名密码
    onMounted(() => {
      // console.log(localStorage)
      if (localStorage.getItem('username')) {
        state.username = localStorage.getItem('username')
        state.password = localStorage.getItem('password')
        state.remberpwd = true
      }
    })
   
    // 记住密码
    // 验证用户名密码
    const login = () => {
      fetch(api + "login?username=" + state.username + "&password=" + state.password)
        .then(response => {
          return response.json()
        }).then((r) => {
          if (r.code == 200) {
            localStorage.setItem('username', state.username)
            localStorage.setItem('password', state.password)
            router.push('/admin')
            alert(r.msg)
            
          } else if (r.code == 400) {
            alert(r.msg)
          }
        })
        .catch(e => state.msg = "Oops, error" + e)

    }

    return {
      ...toRefs(state),
      login,
    }
  },
}


</script>
<style>
.login-top{
  text-align: center;
}
.login-body{
  text-align: center;
}
</style>
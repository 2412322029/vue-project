<script>
import { getCurrentInstance } from "vue";
export default {
  data() {
    return {
      show: {
        code: null,
        msg: null,
        data: null
      }
    }
  },
  methods: {
    gettoshow() {
      const { proxy } = getCurrentInstance();
      proxy.$axios.get("http://124.223.116.35:5000/api/showmsgNearNow?m=10&n=1").then((response) => {
        let res = response.data
        console.log(res);
        this.show.code = res.code
        this.show.msg = res.msg
        this.show.data = res.data
      });
    }
  },
  created() {
    this.gettoshow()
  }
}
</script>

<template>
  <p>{{ show.code }},{{ show.msg }}</p>
  <div v-if="show.code == 200">
    <template v-for="item in show.data">
      <div>
        <img :src="item.avatar" alt="" id="avatar">
      <p>comment_count:{{ item.comment_count }}</p>
      <p>{{ item.data }}</p>
      <p>{{ item.id }}</p>
      <img :src="item.imgurl" alt="" id="imgurl">
      <p>{{ item.imgurl }}</p>
      <p>{{ item.name }}</p>
      <p>{{ item.time }}</p>
      <p>{{ item.title }}</p>
      </div>
    </template>
  </div>
</template>

<style>
img {
  width: 50px;
}
</style>

<script>
import bar from "./components/Bar.vue"
import foot from "./components/footer.vue"
import { getCurrentInstance } from "vue";
export default {
  data() {
    return {
      show: {
        code: null,
        msg: null,
        data: null
      },
      www: "fff",
      inputx: null,
      sex: [],
      ani: []
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
    // this.gettoshow()
  },
  components: {
    bar,
    foot
  }
}
</script>


<template>
  <div id="header">
    <bar></bar>
  </div>
  <hr id="dd">
  <div id="main">
    
    <!-- 路由出口 -->
    <router-view></router-view>

  </div>

  <foot></foot>
</template>

<style>
img {
  width: 50px;
}

#ss {
  border: 1px solid white;
}

#dd {

  display: block;
  border-top: 0.4em solid #818BC5;
  border-bottom: 0.4em solid #BE81C5;

}
</style>

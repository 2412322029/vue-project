<script>
import bar from "./components/Bar.vue"
import foot from "./components/footer.vue"
// import { getCurrentInstance } from "vue";
export default {
    data() {
        return {

            www: "fff",
            inputx: null,
            sex: [],
            ani: []
        }
    },
    methods: {
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

#ss {
  border: 1px solid white;
}

#dd {

  display: block;
  border-top: 0.4em solid #818BC5;
  border-bottom: 0.4em solid #BE81C5;

}
</style>

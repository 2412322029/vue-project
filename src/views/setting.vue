<template>
    <h2>设置</h2>
    <label for="api">api地址:</label>
    <input id="api" v-model="api">
    <button @click="set" type="button" >确定</button>
    <button @click="reset" type="button">重置</button>
</template>
<script>
import {testapi} from "../main"
export default{
    data(){
        return{
            api:testapi
        }
    },
    methods:{
        set(){
            localStorage.setItem("api",this.api)
        },
        reset(){
            localStorage.removeItem("api")
            this.api=testapi
        }
    }
}

</script>
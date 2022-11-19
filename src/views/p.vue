<script>
import { api } from '../main';
import { useRoute } from 'vue-router'
import { marked } from 'marked'
export default {
    data() {
        return {
            data: "",
            msg: "",
        }
    },
    methods: {
        mk(c) {
            var rendererMD = new marked.Renderer();
            marked.setOptions({
                renderer: rendererMD,
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false
            });
            return marked(c || '');
        },
        back(){
            this.$router.go(-1)
        }
    },
    created() {
        const route = useRoute()

        this.msg = "loading..."
        fetch(api + "getonedetail?id=" + route.params.pid)
            .then(response => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    this.msg = response.status + "错误"
                }
            }).then((r) => {
                if (this.data != null) {
                    this.data = r
                    this.msg = ""
                } else {
                    this.msg = "查询为空"
                }
            })
            .catch(e => this.msg = "Oops, error" + e)

    }

}

</script>
<template>{{ msg }}
    <button @click="back">
        返回
    </button>

    <div v-if="data != null">
        <h2 id="title">{{ data.title }}</h2>
        <p id="details">time:{{ data.postTime }} uid:{{ data.userId }}</p>
        <article v-html="mk(data.content)"></article>


    </div>
</template>
<style>
#title {
    text-align: center;

}

#details {
    text-align: center;
    font-size: 12px;
}

article img {
    width: 60%;
    margin-left: 20%;
}

article table {
    border-collapse: collapse;
}

article table th {
    font-weight: bold;
}

article table th,
article table td {
    border: 1px solid #ccc;
    padding: 6px 17px;
}

article table tr {
    border-top: 1px solid #ccc;
    background-color: #fff;
}

article table tr:nth-child(2n) {
    background-color: #f8f8f8;
}

article blockquote {
    background: #f9f9f9;
    border-left: 10px solid #BE81C5;
    margin: 1.5em 10px;
    padding: 0.5em 10px;
    quotes: "\201C" "\201D" "\2018" "\2019";
}

article blockquote p {
    display: inline;
}
</style>
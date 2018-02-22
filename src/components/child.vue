<template>
    <header>
        <div id="logo">{{logo}}</div>
        <ul>
            <li v-for="nav in navs">{{nav.title}}</li>
        </ul>
        <input type="text" @change="setUser" v-model="username">
    </header>
</template>  
<script scoped>
    export default {
      name: "headDiv",
      data() {
        return {
          navs: [{ title: "主页" }, { title: "日志" }],
          username: 'tsl'
        };
      },
      props: ['logo'],
      methods: {
          setUser() {
              this.$emit('transferUser', this.username)
          }
      }
    };
</script>
    
<template>
  <!-- <headDiv :logo="logoMsg"></headDiv></div> -->
  
    <div>
        <headDiv :logo="logoMsg"></headDiv>
        <headDiv @transferUser='getUser'></headDiv>
        {{user}}
    </div>
</template>
<script>
    import headDiv from "../components/child.vue";
    export default {
      name: "app",
      data() {
        return {
          logoMsg: "Sooooup",
          user: ""
        };
      },
      components: {
        headDiv
      },
      methods: {
        getUser(msg) {
          this.user = msg;
        }
      }
    };
</script>

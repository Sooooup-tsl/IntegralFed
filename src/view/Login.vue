<template>
    <div class="page has-navbar" v-nav="{ title: '登录'}">
        <div class="page-content">
            <von-input 
                type="text" 
                v-model="username" 
                placeholder="用户名" 
                label="用户名">
            </von-input>
            <von-input 
                type="text" 
                v-model="password" 
                placeholder="密码" 
                label="密码">
            </von-input>
            <div class="padding">
                <md-button class="button button-positive button-block" @click.native="login()">
                    登录
                </md-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import Vonic from "vonic";
    import axios from "axios";
    Vue.prototype.$http = axios;

    export default {
      data() {
        return {
          username: "",
          password: ""
        };
      },
      methods: {
        // 登录
        login() {
          if (!this.username) {
            $toast.show("请输入用户名");

            return;
          }
          if (!this.password) {
            $toast.show("请输入密码");

            return;
          }

          $loading.show("登录成功");

          setTimeout(() => {
              this.$router.push({ path: "/Home" });
            $loading.hide();
          }, 2000);

          this.loginAjax();
        },
        // 登录接口请求
        loginAjax() {
          axios
            .get("http://localhost:5080/integralsystem/integralSystemLogin/login", {
              params: {
                loginName: this.username, //工号
                password: this.password //密码
              }
            })
            .then(
              resolve => {
                // success callback
                console.log(resolve);
              },
              reject => {
                // error callback
                console.log(reject);
              }
            )
            .catch(e => console.log(e));
        }
      }
    };
</script>
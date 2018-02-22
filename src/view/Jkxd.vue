<template>
    <div class="page has-navbar" v-nav="{ title: '奖扣下达', showBackButton: true, onBackButtonClick: back,  showMenuButton: true, menuButtonText: mbtnTxt, onMenuButtonClick: onAdd}">
        <div class="page-content">
            <tabs :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick"></tabs>
            <div class="mt50">
                <ul class="score-mission" v-for="list in grantList" :key="list.grantid">
                    <li>
                        <label>{{tabIndex ? '奖扣来源' : '奖扣对象'}}：</label>
                        <span>{{tabIndex ? list.grantusername : list.granttousername}}</span>
                        <div class="btn-float-left">
                            <label>奖扣类型：</label>
                            <span>{{list.granttype == 1 ? '扣' : '奖'}}</span>
                        </div>
                    </li>
                    <li>
                        <label>奖扣标准：</label>
                        <span>{{list.grantcategory}}</span>
                    </li>
                    <li>
                        <label>奖扣时间：</label>
                        <span>{{list.granttime | formateDate}}</span>
                    </li>
                    <li>
                        <label>奖扣分：</label>
                        <span :class="list.granttype == 1 ? 'balanced' : 'assertive'">{{list.grantscore}}</span>
                        <div class="btn-float-left" v-if="list.status">
                            <label>状态：</label>
                            <span>{{list.status}}</span>
                        </div>
                    </li>
                    <li>
                        <label>奖扣备注：</label>
                        <span>{{list.grantyremark}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import Vonic from "vonic";
    import axios from "axios";
    import cjs from '../util/common';
    
    let {dateUtil} = cjs;
    Vue.prototype.$http = axios;

    export default {
      data() {
        return {
          tabs: ["我的下达", "他的下达"],
          tabIndex: 0,
          grantList: [
            {
              grantid: 2,
              grantusernum: 13,
              grantusername: "管涵",
              granttousernum: 12,
              granttousername: "汤圣灵",
              granttype: 0,
              grantcategory: "临时任务",
              grantitem: "5",
              grantscore: 5,
              grantyremark: "备注",
              granttime: 1516345048000
            },
            {
              grantid: 1,
              grantusernum: 13,
              grantusername: "管涵",
              granttousernum: 12,
              granttousername: "汤圣灵",
              granttype: 0,
              grantcategory: "临时任务",
              grantitem: "5",
              grantscore: 5,
              grantyremark: "备注",
              granttime: 1516184412000
            }
          ],
          mbtnTxt: '<i class="icon ion-android-add"></i>'
        };
      },
      methods: {
        back() {
          history.back();
        },
        onTabClick(index) {
          this.tabIndex = Number(index);
        },
        onAdd() {
          this.$router.push({ path: "/JkxdAdd" });
        },
        getXDRW() {
          getXDRW();
        }
      },
      beforeMount() {
        this.getXDRW();
      },
      filters: {
        formateDate: function(value) {
          return  dateUtil.format(value, "Y年M月D日 H时F分");
        }
      }
    };

    // 接口获取下达任务
    function getXDRW() {
      axios
        .get("http://tcmobileapi.17usoft.com/carmobileapijava/carorder/getusetime")
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
</script>

<style <style lang="less" scoped>
    .mt50 {
      margin-top: 50px;
    }
    .score-mission {
      position: relative;
      background: #e3ffd5;
      color: #333;
      padding: 15px;
      line-height: 24px;
      margin-bottom: 10px;
      li {
        position: relative;
      }
      label {
        font-weight: 600;
        font-size: 15px;
      }
      .btn-float-left {
        bottom: 0;
        position: absolute;
        right: 0;
      }
    }
</style>
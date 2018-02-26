<template>
    <div class="page has-navbar" v-nav="{ title: '奖扣审核', showBackButton: true, onBackButtonClick: back}">
        <div class="page-content">
            <tabs :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick"></tabs>
            <div class="mt50">
                <div class="score-mission item-icon-left" v-for="(list,index) in scoreApplyList" :key="list.applyid">
                    <i class="icon" v-bind:class="{'ion-ios-checkmark positive': list.checked, 'ion-ios-circle-outline grey': !list.checked}" @click="selectedProduct(list)"></i> 
                    <ul class="list" @click="intoDetail(list, index)">
                        <li>
                            <label>申请人：</label>
                            <span>{{list.applyusername}}</span>
                            <div class="btn-float-left">
                                <label>申请奖扣：</label>
                                <span>{{list.applytype == 1 ? '扣' : '奖'}}</span>
                            </div>
                        </li>
                        <li>
                            <label>申请类型：</label>
                            <span>{{list.applycategory}}</span>
                        </li>
                        <li>
                            <label>申请细则：</label>
                            <span>{{list.applyitem}}</span>
                        </li>
                        <li>
                            <label>申请时间：</label>
                            <span>{{list.applytime | formateDate}}</span>
                        </li>
                        <li>
                            <label>申请分数：</label>
                            <span :class="list.applytype==1 ? 'balanced' : 'assertive'">{{list.applyscore}}</span>
                            <div class="btn-float-left">
                                <label>状态：</label>
                                <span>{{tabIndex | formateStatus}}</span>
                            </div>
                        </li>
                        <li>
                            <label>申请备注：</label>
                            <span>{{list.applyremark}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="item item-icon-left jksh-all">
                <i class="icon" :class="checkAllFlag ? 'ion-ios-checkmark positive' : 'ion-ios-circle-outline grey'" @click="checkAll"></i>
                全部
                <span class="item-note">
                <md-button class="button button-assertive" data-checkedresult="0" @click.native="submit">
                        驳回
                    </md-button>
                    <md-button class="button button-positive" data-checkedresult="1" @click.native="submit">
                        通过
                    </md-button>
                </span>
            </div>
        </div>
    </div>
</template>
<script scoped>
    import Vue from "vue";
    import Vonic from "vonic";
    import axios from "axios";
    import cjs from "../util/common";

    let { dateUtil } = cjs;
    Vue.prototype.$http = axios;

    export default {
      data() {
        return {
          tabs: ["待审核", "已通过", "已驳回"],
          tabIndex: 0,
          scoreApplyList: [],
          checkAllFlag: false
        };
      },
      methods: {
        // 返回
        back() {
          history.back();
        },
        // tab切换
        onTabClick(index) {
          this.tabIndex = index;
          this.getApplyList();
        },
        // 点击勾选/清除item
        selectedProduct(item) {
          if (typeof item.checked == "undefined") {
            // 怎样判断一个对象的变量存不存在 看他的typeof == undedined
            /**
             * this.$set(item,"checked",true)  局部注册
             */
            Vue.set(item, "checked", true);
          } else {
            item.checked = !item.checked;
          }
        },
        // 全选
        checkAll () {
            this.checkAllFlag = !this.checkAllFlag;
            this.scoreApplyList.forEach(item => {
                if (typeof item.checked == "undefined") {
                    this.$set(item,"checked",this.checkAllFlag)
                } else {
                    item.checked = this.checkAllFlag;
                }
            })
        },
        // 点击item进入审核详情
        intoDetail(list, index) {
          this.$router.push({ path: "/Sqxq", query: list });
        },
        getApplyList() {
          // 模拟数据
          var scoreApplyList = [
            {
              applyid: 1,
              applyusernum: 14959,
              applyusername: "姓名",
              applytype: 0,
              applycategory: "任务执行",
              applyitem: "开发任务",
              applyscore: 10,
              applyremark: "",
              applystatus: 0,
              applytime: -2209017600000,
              checkusernum: 0,
              checkscore: 0,
              checktime: -2209017600000
            }
          ];

          this.scoreApplyList = scoreApplyList;
        },
        // 获取我的待审核、审核通过、已驳回积分申请列表-接口请求
        getApplyListAjax() {
          axios
            .get(
              "http://localhost:5080/integralsystem/score/getUserScoreApplyList",
              {
                params: {
                  applyStatus: this.tabIndex
                }
              }
            )
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
      },
      beforeMount() {
        this.getApplyList();
      },
      filters: {
        formateDate: function(value) {
          return dateUtil.format(value, "Y年M月D日 H时F分");
        },
        formateStatus: function(value) {
          var str;
          // 0, "待审核"  |  1, "已通过"  |2, "已驳回" |3, "已取消"
          switch (Number(value)) {
            case 0:
              str = "待审核";
              break;
            case 1:
              str = "已通过";
              break;
            case 2:
              str = "已驳回";
              break;
            case 3:
              str = "已取消";
              break;
            default:
              str = "已取消";
          }

          return str;
        }
      }
    };
</script>
<style lang="less" scoped>
    .score-mission {
      position: relative;
      background: #e3ffd5;
      color: #333;
      padding: 15px 15px 15px 60px;
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
<style scoped>
    .mt50 {
      margin-top: 50px;
    }
    .item-icon-left .icon.grey {
      color: #bbb;
    }
    .jksh-all {
      line-height: 44px;
      font-size: 16px;
      position: fixed;
      width: 100%;
      bottom: 0;
    }
    .item-note .button {
      width: 100px;
    }
</style>

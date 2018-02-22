<template>
    <div class="page has-navbar" v-nav="{ title: '申请详情', showBackButton: true, onBackButtonClick: back}">
        <div class="page-content">
            <div>
                <div class="score-mission">
                    <ul class="list">
                        <li>
                            <label>申请人：</label>
                            <span>{{scoreApply.applyusername}}</span>
                            <div class="btn-float-left">
                                <label>申请奖扣：</label>
                                <span>{{scoreApply.applytype == 1 ? '扣' : '奖'}}</span>
                            </div>
                        </li>
                        <li>
                            <label>申请类型：</label>
                            <span>{{scoreApply.applycategory}}</span>
                        </li>
                        <li>
                            <label>申请细则：</label>
                            <span>{{scoreApply.applyitem}}</span>
                        </li>
                        <li>
                            <label>申请时间：</label>
                            <span>{{scoreApply.applytime | formateDate}}</span>
                        </li>
                        <li>
                            <label>申请备注：</label>
                            <span>{{scoreApply.applyremark}}</span>
                        </li>
                        <li>
                            <label>奖扣分：</label>
                            <select class="score" v-model="scoreApply.applyscore">
                                <option v-for="score in scoreApply.scoreArr" selected="scoreApply.applyscore">{{score}}</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </div>
            <ul class="btn-group padding">
                <li>
                    <md-button class="button button-assertive button-block" data-checkedresult="0" @click.native="submitAjax">
                        驳回
                    </md-button>
                </li>
                <li>
                    <md-button class="button button-positive button-block" data-checkedresult="1" @click.native="submitAjax">
                        通过
                    </md-button>
                </li>
            </ul>
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
          list: {
            name: "李白",
            tpye: "业务",
            detail: "故障解决",
            time: "2017年10月10日",
            score: "5分",
            tips: "给出订单重构的解决方案",
            flag: "扣",
            statue: "待审核",
            scoreArr: ["5分", "10分", "15分"]
          },
          scoreApply: ""
        };
      },
      methods: {
        back() {
          history.back();
        },
        // 按钮提交
        submitAjax(e) {
          //审核的结果,0:拒绝，1:通过
          var checkedresult = e.target.dataset.checkedresult;
          // 列表中的applyid
          var applyid = this.scoreApply.applyid;
          // 审核后的积分
          var checkedScore = this.scoreApply.applyscore;
            
          $loading.show("正在审核");

          setTimeout(() => {
            this.back();
            $loading.hide();
          }, 2000);

          axios
            .get(
              "http://localhost:5080/integralsystem/score/handleCheckingScoreApply",
              {
                params: {
                  applyId: applyid,
                  checkedResult: checkedresult,
                  checkedScore: checkedScore
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
        // 从上个页面带参数的申请详情列表对象
        this.scoreApply = this.$route.query;
        console.log(this.$route.query);
      },
      filters: {
        formateDate: function(value) {
          value = Number(value);
          return dateUtil.format(value, "Y年M月D日 H时F分");
        }
      }
    };
</script>
<style lang="less" scoped>
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
<style scoped>
    .score {
      display: inline-block;
      height: 44px;
      outline: none;
      line-height: 44px;
      border: 0;
      color: #333;
      font-size: 14px;
      right: 0;
    }
    .item-icon-left .icon.grey {
      color: #bbb;
    }
    .btn-group {
      position: fixed;
      width: 100%;
      bottom: 0;
    }
    .btn-group li {
      float: left;
      width: 50%;
    }
    .btn-group li div {
      margin: 10px;
    }
    .item-note .button {
      width: 100px;
    }
</style>

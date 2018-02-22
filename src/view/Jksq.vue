<template>
    <div class="page has-navbar" v-nav="{ title: '我的申请', showBackButton: true, onBackButtonClick: back,  showMenuButton: true, menuButtonText: mbtnTxt, onMenuButtonClick: onAdd}">
        <div class="page-content">
            <div>
                <div class="score-mission" v-for="list in scoreApplyList" :key="list.id">
                    <ul class="list">
                        <li>
                            <label>申请人：</label>
                            <span>{{list.applyusername}}</span>
                        </li>
                        <li>
                            <label>申请理由：</label>
                            <span>{{list.applycategory}}->{{list.applyitem}}</span>
                        </li>
                        <li>
                            <label>申请备注：</label>
                            <span>{{list.applyremark}}</span>
                        </li>
                        <li>
                            <label>申请时间：</label>
                            <span>{{list.applytime | formateDate}}</span>
                        </li>
                        <li>
                            <label>申请积分：</label>
                            <span>{{list.applyscore}}分</span>
                        </li>
                        <li>
                            <label>申请状态：</label>
                            <span>{{list.applystatus | formateStatus}}</span>
                        </li>
                        <li class="btn-float-left">
                            <button class="button button-assertive" @click="cancelApply(list)">取消</button>
                        </li>
                    </ul>
                </div>
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
          lists: [
            {
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
            {
              name: "李白",
              tpye: "业务",
              detail: "故障解决",
              time: "2017年10月10日",
              score: "5分",
              tips: "给出订单重构的解决方案",
              flag: "奖",
              statue: "待审核",
              scoreArr: ["5分", "10分", "15分"]
            }
          ],
          scoreApplyList: [],
          mbtnTxt: '<i class="icon ion-android-add"></i>'
        };
      },
      methods: {
        back() {
          history.back();
        },
        // 获取我的积分列表
        getScoreList() {
          // 模拟
          var scoreApplyList = [
            {
              applycategory: "任务执行", //积分申请大类
              applyid: 2, //积分申请ID
              applyitem: "临时任务", //积分申请小类
              applyremark: "good", //备注
              applyscore: 20, //积分
              applystatus: 0, //状态
              applytime: 1517392255000, //申请时间
              applytype: 0, //0:奖 1:扣
              applyusernum: 14959, //积分申请工号
              applyusername: "姓名", //积分申请名称
              checkscore: 5, //审核积分
              checktime: 1517393066000, //审核时间
              checkusernum: 14959 //审核工号
            }
          ];

          this.scoreApplyList = scoreApplyList;
        },
        // 获取我的积分列表-接口请求
        getScoreListAjax() {
          axios
            .get(
              "http://localhost:8080/TCGroundTrafficIntegralAPI/score/getScoreList",
              {
                params: {
                  userNum: "11111"
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
        },
        // 取消申请
        cancelApply(list) {
          console.log(list);
          $loading.show("正在取消");

          setTimeout(() => {
            $loading.hide();
          }, 2000);

          axios
            .get(
              "http://localhost:8080/TCGroundTrafficIntegralAPI/score/getScoreList",
              {
                params: {
                  scoreType: list.applytype, //申请类型 0奖  1扣
                  category: list.applycategory, //大类
                  item: list.applyitem, //小类
                  applyScore: list.applyscore, //积分值
                  remark: list.applyremark, //备注
                  applyStatus: list.applystatus, //  状态
                  userNum: list.applyusernum, //工号
                  applyid: list.applyid //积分申请ID
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
      },
      beforeMount() {
        this.getScoreList();
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
        &.btn-float-left {
          bottom: 0;
          position: absolute;
          right: 0;
        }
        label {
          font-weight: 600;
          font-size: 15px;
        }
      }
    }
</style>

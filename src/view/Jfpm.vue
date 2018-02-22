<template>
    <div class="page has-navbar" v-nav="{ title: '积分排名', showBackButton: true, onBackButtonClick: back,  showMenuButton: true, menuButtonText: mbtnTxt, onMenuButtonClick: onFilter}">
        <div class="page-content">
            <h4 class="text-center">月度排名 部门</h4>
            <div>
                <list>
                    <item>
                        时间
                        <span class="item-note">
                            2018年1月
                        </span>
                    </item>
                    <item v-for="(list,index) in userScoreSortList" :key="list.id" class="item-icon-left">
                        <i class="icon  ion-ribbon-a Gold" v-if="index == 0"></i>
                        <i class="icon  ion-ribbon-a Lavender" v-else-if="index == 1"></i>
                        <i class="icon  ion-ribbon-a Coral" v-else-if="index == 2"></i>
                        <i class="icon ion-social-github dark" v-else></i>
                        {{list.userName}}
                        <span class="item-note">
                            {{list.sumScore}}
                        </span>
                    </item>
                </list>
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
          mbtnTxt: '<i class="icon ion-funnel"></i>',
          userScoreSortList: []
        };
      },
      methods: {
        back() {
          history.back();
        },
        onFilter() {
          this.$router.push({ path: "/Pmcx" });
        },
        // 获取用户积分排序
        getUserScoreSort() {
          // 模拟数据
          var userScoreSortList = [
            {
              ranking: 1, //排名
              sumScore: 30, //总分
              userName: "汤圣灵", //名称
              userNum: 19984 //工号
            },
            {
              ranking: 2,
              sumScore: 20,
              userName: "冯倩",
              userNum: 24137
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "48376",
              userNum: 48376
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "张好军",
              userNum: 15502
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "杨守建",
              userNum: 23740
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "陆游",
              userNum: 23192
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "束方卿",
              userNum: 28268
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "陆世民",
              userNum: 29782
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "文盼林",
              userNum: 5549
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "陈文英",
              userNum: 25570
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "马腾",
              userNum: 18784
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "俞晨佳",
              userNum: 22197
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "钟磊",
              userNum: 27665
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "鞠蓉",
              userNum: 691
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "董海波",
              userNum: 41318
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "朱修凯",
              userNum: 25781
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "余潇潇",
              userNum: 22360
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "史文胜",
              userNum: 22169
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "潘馨婷",
              userNum: 6771
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "陈骏",
              userNum: 13843
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "杨伶",
              userNum: 47925
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "陈汝特",
              userNum: 46554
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "王广云",
              userNum: 47606
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "王小可",
              userNum: 48117
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "孙丹丹",
              userNum: 48173
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "测试用户0510",
              userNum: 123456789
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "江村",
              userNum: 40452
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "张玲",
              userNum: 48231
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "王心洁",
              userNum: 48358
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "郭智威",
              userNum: 48760
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "刘文广",
              userNum: 48120
            },
            {
              ranking: 3,
              sumScore: 0,
              userName: "48525255",
              userNum: 4852522
            }
          ];

          this.userScoreSortList = userScoreSortList;
        },
        // 获取用户积分排序-接口请求
        getUserScoreSortAjax() {
          var userScoreWay = sessionStorage.getItem("userScoreWay");
          // 积分排序筛选条件
          if (userScoreWay) {
            userScoreWay = JSON.parse(userScoreWay);
            //排名方式：0员工 1管理者
            var userScoreSortType = userScoreWay.userScoreSortType;
            //开始时间
            var scoreTimeBegin = userScoreWay.scoreTimeBegin;
            //结束时间
            var scoreTimeEnd = userScoreWay.scoreTimeEnd;
            // 部门Id
            var userDept = userScoreWay.userDept;
            // 排名范围 1.月度排名，2.阶段排名，3.总分排名
            var userScoreSortScope = userScoreWay.userScoreSortScope;
          }
          axios
            .get(
              "http://localhost:8080/TCGroundTrafficIntegralAPI/score/userScoreSort",
              {
                params: {
                  userScoreSortType: userScoreSortType,
                  scoreTimeBegin: scoreTimeBegin,
                  scoreTimeEnd: scoreTimeEnd,
                  userDept: userDept,
                  userScoreSortScope: userScoreSortScope
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
        this.getUserScoreSort();
        this.getUserScoreSortAjax();
      }
    };
</script>
<style scoped>
    .Gold {
      color: gold;
    }
    .Lavender {
      color: Lavender;
    }
    .Coral {
      color: Coral;
    }
</style>

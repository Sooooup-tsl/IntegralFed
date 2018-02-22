<template>
    <div class="page has-navbar" v-nav="{ title: '积分查询', showBackButton: true, onBackButtonClick: back,  showMenuButton: isManager, menuButtonText: mbtnTxt, onMenuButtonClick: onSearch }">
        <div class="page-content">
            <!-- <router-link class="button button-assertive" to="/Xzyg">
                <i class="ion-information-circled"></i> 选择员工
            </router-link> -->
            <div class=" text-center mb10">
                <p class="score-head"><span>总积分</span>{{totalScore}}分</p>
                <h4>前端 | 汤圣灵</h4> 
                <p class="score-grade">当前排名：1</p>
                <p class="score-month balanced">
                    时间<input type="month" value='data' class="score-date" v-model="date">
                </p>
            </div>
            <list>
                <item v-for="list in scoreList" :key="list.id">
                    {{list.scoreSourceDesc}}
                    <span class="item-note">
                        {{list.scoreEntity.score}}分
                    </span>
                </item>
            </list>
        </div>
    </div>

  <!-- 用 title / left / right 三个slot分发标题、左按钮、右按钮 -->
    <!-- <von-header theme="dark">
        <button class="button button-icon ion-ios-arrow-back" slot="left"></button>
        <span slot="title">积分查询</span>
        <router-link  to="/about" class="button button-icon ion-navicon" slot="right"></router-link>
    </von-header> -->
</template>
<script scoped>
    var isShow = "1"; // 0员工 | 1管理者
    export default {
      data() {
        return {
          isManager: isShow ? true : false,
          mbtnTxt: '<i class="icon ion-ios-search-strong"></i>',
          date: "2017-09",
          theme: "",
          scoreList: []
        };
      },
      computed: {
        // 总积分
        totalScore() {
          let score = 0;
          if (this.scoreList) {
            this.scoreList.forEach(list => {
              score += Number(list.scoreEntity.score);
            });
          }

          return score;
        }
      },
      methods: {
        // 返回
        back() {
          history.back();
        },
        // 管理员才展示 -> 选择员工
        onSearch() {
          this.$router.push({ path: "/Xzyg" });
        },
        getScoreInfo() {
          // 模拟数据
          var scoreList = [
            {
              scoreEntity: {
                scoreid: 1,
                scoreusernum: 14959,
                scoresource: 0,
                score: 10,
                scoretype: 0,
                scoretime: -2209017600000,
                scoreyear: 2018,
                scoremonth: 1,
                scoreday: 12
              },
              scoreSourceDesc: "奖扣申请"
            },
            {
              scoreEntity: {
                scoreid: 3,
                scoreusernum: 14959,
                scoresource: 3,
                score: 20,
                scoretype: 0,
                scoretime: 1516112246000,
                scoreyear: 2018,
                scoremonth: 1,
                scoreday: 16
              },
              scoreSourceDesc: "固定积分"
            }
          ];

          this.scoreList = scoreList;
        },
        // 获取用户积分信息-接口请求
        getScoreInfoAjax() {
          axios
            .get("http://localhost:5080/integralsystem/score/getUserScoreDetails", {
              params: {
                userNum: this.username,
                year: this.password,
                month: this.month
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
      },
      beforeMount() {
          this.getScoreInfo();
      }
    };
</script>

<style scoped>
    .mb10 {
      margin-bottom: 10px;
    }
    .score-month {
      text-align: left;
      background: #fff;
      height: 50px;
      line-height: 50px;
      color: #333;
      /* padding-left: 10px; */
      font-size: 14px;
      margin: 0;
      padding: 0 16px;
    }
    input.score-date {
      display: inline-block;
      height: 44px;
      outline: none;
      line-height: 44px;
      border: 0;
      color: #333;
      font-size: 14px;
      text-align: right;
      float: right;
      right: 0;
      -webkit-appearance: none;
    }
    .score-head {
      background: #4a90e2;
      margin: 20px auto;
      border-radius: 100% 100%;
      height: 100px;
      width: 100px;
      color: #fff;
      font-size: 24px;
      padding: 20px 0;
      line-height: 28px;
    }
    .score-head span {
      font-size: 15px;
      display: block;
    }
    .score-grade {
      position: relative;
      color: #333;
    }
    .score-grade:before {
      content: "";
      position: absolute;
      border-top: 1px solid #ddd;
      width: 100px;
      left: 50%;
      margin-left: -150px;
      top: 50%;
    }
    .score-grade:after {
      content: "";
      position: absolute;
      border-top: 1px solid #ddd;
      width: 100px;
      right: 50%;
      margin-right: -150px;
      top: 50%;
    }
</style>

<template>
  <div class="page has-navbar" v-nav="{title: '任务管理', showBackButton: true, onBackButtonClick: back }">
    <div class="page-content">
        <div>
            <ul class="score-mission" v-for="mission in missionList" :key="mission.id">
                <li v-for="list in mission">
                    <label>{{list.title}}：</label>
                    <span>{{list.desc}}</span>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>
<script>
    export default {
      data() {
        return {
          missionList: [
            [
              {
                title: "任务",
                desc: "大首页优化"
              },
              {
                title: "预计开始",
                desc: "2018-01-01"
              },
              {
                title: "预计结束",
                desc: "2018-01-01"
              },
              {
                title: "实际开始",
                desc: "2018-01-02"
              },
              {
                title: "实际结束",
                desc: "2018-01-02"
              },
              {
                title: "预计花费",
                desc: "1天"
              },
              {
                title: "实际花费",
                desc: "1天"
              },
              {
                title: "预计积分",
                desc: "10"
              },
              {
                title: "实际积分",
                desc: "15"
              }
            ],
            [
              {
                title: "任务",
                desc: "大首页优化"
              },
              {
                title: "预计开始",
                desc: "2018-01-01"
              },
              {
                title: "预计结束",
                desc: "2018-01-01"
              },
              {
                title: "实际开始",
                desc: "2018-01-02"
              },
              {
                title: "实际结束",
                desc: "2018-01-02"
              },
              {
                title: "预计花费",
                desc: "1天"
              },
              {
                title: "实际花费",
                desc: "1天"
              },
              {
                title: "预计积分",
                desc: "10"
              },
              {
                title: "实际积分",
                desc: "15"
              }
            ]
          ]
        };
      },
      methods: {
        back() {
          history.back();
        }
      }
    };
</script>
<style>
    .score-mission {
      background: #e3ffd5;
      color: #333;
      padding: 15px;
      line-height: 24px;
      margin-bottom: 10px;
    }
    .score-mission label {
      font-weight: 600;
      font-size: 15px;
    }
</style>

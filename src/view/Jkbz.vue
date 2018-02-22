<template>
<div class="page has-navbar" v-nav="{ title: '奖扣标准', showBackButton: true, onBackButtonClick: back }">
    <div class="page-content">
        <tabs :tab-items="tabs" :tab-index="tabIndex" :on-tab-click="onTabClick"></tabs>
        <!-- 手风琴页面 -->
        <accordion style="padding-top: 50px;">
            <accordion-item v-for="(list, index) in typeList[tabIndex].categoryList" :title="list.stdCategory" :key="list.id" content-height="110">
                <div>
                    <list>
                        <item v-for="subList in list.itemList" :key="subList.stdId">
                            {{subList.stdItem}}
                            <span class="item-note">
                                {{subList.stdScoreSection}}
                            </span>
                        </item>
                    </list>
                </div>
            </accordion-item>
        </accordion>
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
          tabs: ["奖分", "扣分"],
          tabIndex: 0,
          typeList: [
            {
              stdType: "0", 
              categoryList: [
                {
                  stdCategory: "任务执行",
                  itemList: [
                    {
                      stdId: 1,
                      stdType: "0",
                      stdCategory: "任务执行",
                      stdItem: "开发任务",
                      stdScoreSection: "5,10,15,20",
                      stdOrder: 1
                    },
                    {
                      stdId: 2,
                      stdType: "0",
                      stdCategory: "任务执行",
                      stdItem: "任务未按时完成",
                      stdScoreSection: "5,10,15",
                      stdOrder: 2
                    }
                  ]
                }
              ]
            },
            {
              stdType: "1",
              categoryList: [
                {
                  stdCategory: "出勤加班",
                  itemList: [
                    {
                      stdId: 3,
                      stdType: "1",
                      stdCategory: "出勤加班",
                      stdItem: "自然月全勤",
                      stdScoreSection: "30",
                      stdOrder: 1
                    }
                  ]
                },
                {
                  stdCategory: "任务执行",
                  itemList: [
                    {
                      stdId: 5,
                      stdType: "1",
                      stdCategory: "任务执行",
                      stdItem: "临时任务",
                      stdScoreSection: "5,10",
                      stdOrder: 1
                    },
                    {
                      stdId: 6,
                      stdType: "1",
                      stdCategory: "任务执行",
                      stdItem: "紧急任务",
                      stdScoreSection: "5,10,15,20",
                      stdOrder: 1
                    }
                  ]
                },
                {
                  stdCategory: "团队建设",
                  itemList: [
                    {
                      stdId: 4,
                      stdType: "1",
                      stdCategory: "团队建设",
                      stdItem: "积极参加公司、项目活动",
                      stdScoreSection: "5,10",
                      stdOrder: 3
                    }
                  ]
                }
              ]
            }
          ]
        };
      },
      methods: {
        back() {
          history.back();
        },
        onTabClick(index) {
          this.tabIndex = index;
        },
        getJKBZ() {
            getJKBZ();
        }
      },
      beforeMount() {
          this.getJKBZ();
      }
    };

    // 接口获取奖扣标准
    function getJKBZ() {
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
        ).catch( e=> console.log(e) );
    }
</script>

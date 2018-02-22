<template>
  <div class="page has-navbar" v-nav="{title: '奖扣下达', showBackButton: true, onBackButtonClick: back }">
    <div class="page-content">
        <!-- 奖扣对象 -->
        <div class="item item-input item-select">
            <div class="input-label">
                奖扣对象
            </div>
            <select v-model="choosePerson">
                <option v-for="value in person">{{value}}</option>
            </select>
        </div>
        <!-- 三级联动 类别-条目明细-分值区间 -->
        <div>
            <cascade :fields="fields" :data="typeList" :value="chooseTypeList" :on-change="onChange"></cascade>
        </div>
        <von-input 
            type="text" 
            v-model="JKtips" 
            placeholder="" 
            label="奖扣备注">
        </von-input>
        <div class="padding">
            <md-button class="button button-positive button-block" @click.native="submit()">
                确认下达
            </md-button>
        </div>
    </div>
  </div>
</template>
<script scoped>
    import Vue from "vue";
    import Vonic from "vonic";
    import axios from "axios";
    import cjs from "../util/common";

    let { translateTypeList } = cjs;
    Vue.prototype.$http = axios;

    export default {
      data() {
        return {
          person: ["李白", "曹操", "汤圣灵"],
          choosePerson: "",
          fields: ["奖扣类型", "标准类型", "标准细则", "奖扣分值"],
          typeList: [],
          chooseTypeList: [],
          JKtips: ""
        };
      },

      methods: {
        back() {
          history.back();
        },
        onChange(value) {
          this.chooseTypeList = value;
          console.log(this.chooseTypeList);
        },
        // 获取奖扣标准数据
        getTypeList() {
          // 模拟数据
          var mork = [
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
          ];
          // 根据奖扣标准数据转换成联动数据
          this.typeList = translateTypeList(mork);
        },
        // 确认下达接口请求
        submit() {
          let granttousername = this.choosePerson;
          let granttype = this.chooseTypeList[0] == "奖分" ? 0 : 1;
          let grantcategory = this.chooseTypeList[1];
          let grantitem = this.chooseTypeList[2];
          let grantscore = this.chooseTypeList[3];
          let grantyremark = this.JKtips;
          // 模拟参数
          var params = {
            grantusernum: "13",
            granttousernum: "12",
            granttousername: granttousername,
            granttype: granttype,
            grantcategory: grantcategory,
            grantitem: grantitem,
            grantscore: grantscore,
            grantyremark: grantyremark
          };
          console.log(params);

          if (!this.chooseTypeList[0]) {
            $toast.show("请选择奖扣类型");

            return;
          }
          if (!grantcategory) {
            $toast.show("请选择标准类型");

            return;
          }
          if (!grantitem) {
            $toast.show("请选择标准细则");

            return;
          }
          if (!grantscore) {
            $toast.show("请选择奖扣分值");

            return;
          }
          if (!grantyremark) {
            $toast.show("请填写奖扣备注");

            return;
          }

          $loading.show("下达成功");

          setTimeout(() => {
            $loading.hide();
          }, 2000);

          // 接口
          axios
            .get(
              "http://tcmobileapi.17usoft.com/carmobileapijava/carorder/getusetime",
              {
                params: {
                  grantusernum: "13",
                  granttousernum: "12",
                  granttype: granttype,
                  grantcategory: grantcategory,
                  grantitem: grantitem,
                  grantscore: grantscore,
                  grantyremark: grantyremark
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
        this.getTypeList();
      }
    };
</script>
<style lang="less" scoped>
    .item-select {
      padding-top: 10px;
      padding-bottom: 10px;
      .input-label {
        font-size: 14px;
      }
    }
</style>

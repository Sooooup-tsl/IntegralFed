<template>
    <div class="page has-navbar" v-nav="{ title: '排名查询', showBackButton: true, onBackButtonClick: back }">
        <div class="page-content">
            <!-- 排名方式 -->
            <div>
                <div class="item item-divider text-center">
                    排名方式
                </div>
                <von-radio :options="rankWayObj.desc" v-model="rankWayObj.index"></von-radio>
            </div>
            <!-- 排名范围 -->
            <div>
                <div class="item item-divider text-center">
                    排名范围
                </div>
                <von-radio :options="rankRangeObj.desc" v-model="rankRangeObj.index"></von-radio>
            </div>
            <!-- 排名部门 -->
            <div class="item item-input item-select mtb10">
                <div class="input-label">
                    排名部门
                </div>
                <select v-model="selectedScoreDepEntity">
                    <option v-for="list in scoreDepEntityList" :value="list">{{list.depname}}</option>
                </select>
            </div>
            <!-- 月度查询 -->
            <div class="mtb10">
                <p class="score-month balanced">
                    月度查询<input type="month" value='month' class="score-date" v-model="month">
                </p>
            </div>
            <!-- 开始时间-结束时间 -->
            <div>
                <datepicker v-model="startTime" label="开始时间" date-format="yyyy-mm-dd"></datepicker>
                <datepicker v-model="endTime" label="结束时间" date-format="yyyy-mm-dd"></datepicker>
            </div>

            <p class="padding">
                option 排名方式: {{ rankWayObj.index }}、{{ rankWayObj.desc[rankWayObj.index] }}<br>
                option 排名范围: {{ rankRangeObj.index }}、{{ rankRangeObj.desc[rankRangeObj.index] }}<br>
                option 排名部门: {{ selectedScoreDepEntity }}<br>
                option 月度查询: {{month}}<br>
                option 开始时间-结束时间: {{ startTime }} - {{ endTime }}
            </p>
            <div class="padding">
                <md-button class="button button-positive button-block" @click.native="setUserScoreWay">
                    确定
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

    let { dateUtil } = cjs;
    Vue.prototype.$http = axios;

    export default {
      data() {
        return {
          // 排名方式
          rankWayObj: {
            index: 0,
            desc: ["员工排名", "管理排名"]
          },
          // 排名范围
          rankRangeObj: {
            index: 0,
            desc: ["月度排名", "阶段排名", "总分排名"]
          },
          scoreDepEntityList: [],
          selectedScoreDepEntity: {},
          month: "2018-01",
          startTime: "2018-01-01",
          endTime: "2019-01-01"
        };
      },
      methods: {
        back() {
          history.back();
        },
        // 设置排名查询方式条件
        setUserScoreWay() {
          //排名方式：0员工 1管理者
          var userScoreSortType = this.rankWayObj.index;
          //开始时间
          var scoreTimeBegin = new Date(this.startTime.replace("-", "/")).getTime();
          //结束时间
          var scoreTimeEnd = new Date(this.endTime.replace("-", "/")).getTime();
          // 排名范围 1.月度排名，2.阶段排名，3.总分排名
          var userScoreSortScope = this.rankRangeObj.index + 1;
          // 部门Id
          var userDept = this.selectedScoreDepEntity.depid;

          var param = {
            userScoreSortType: userScoreSortType,
            scoreTimeBegin: scoreTimeBegin,
            scoreTimeEnd: scoreTimeEnd,
            userDept: userDept,
            userScoreSortScope: userScoreSortScope
          };

          console.log(param);

          sessionStorage.setItem("userScoreWay", JSON.stringify(param));
          this.back();
        },
        // 获取部门信息
        getScoreDepartment() {
          // 模拟数据
          var scoreDepEntityList = [
            {
              depid: "9c9ab920c7ef4a90b22b147ad01ff0e6",
              depname: "地面交通研发部",
              deppid: "f7f816aaed6c4ebca4974ec7d3449e76",
              deppids:
                "0,fe2b4cab21f84efb88b6524ad0b1ff5a,f7f816aaed6c4ebca4974ec7d3449e76,",
              depremark: "",
              depsort: 0,
              id: 1
            },
            {
              depid: "3dcd4e233c22425d8b8374de9dfc4090",
              depname: "同程自营三亚",
              deppid: "fe2b4cab21f84efb88b6524ad0b1ff5a",
              deppids: "0,fe2b4cab21f84efb88b6524ad0b1ff5a,",
              depremark: "",
              depsort: 0,
              id: 2
            },
            {
              depid: "3cb6a05b71ec4797ba78717c754ce25e",
              depname: "EB测试供应商2",
              deppid: "fe2b4cab21f84efb88b6524ad0b1ff5a",
              deppids: "0,fe2b4cab21f84efb88b6524ad0b1ff5a,",
              depremark: "",
              depsort: 0,
              id: 3
            },
            {
              depid: "f7f816aaed6c4ebca4974ec7d3449e76",
              depname: "地面交通项目部",
              deppid: "fe2b4cab21f84efb88b6524ad0b1ff5a",
              deppids: "0,fe2b4cab21f84efb88b6524ad0b1ff5a,",
              depremark: "",
              depsort: 0,
              id: 4
            },
            {
              depid: "b53954ca07ec4c3f8dab773201253ca1",
              depname: "综合部",
              deppid: "9bb718910ec74a18bc77d5f6bfd620d2",
              deppids:
                "0,fe2b4cab21f84efb88b6524ad0b1ff5a,9bb718910ec74a18bc77d5f6bfd620d2,",
              depremark: "",
              depsort: 0,
              id: 5
            },
            {
              depid: "fe2b4cab21f84efb88b6524ad0b1ff5a",
              depname: "同程网络科技有限公司",
              deppid: "0",
              deppids: "0,",
              depremark: "",
              depsort: 0,
              id: 6
            },
            {
              depid: "5a47799ed4a54c71b05bb806fffa5059",
              depname: "EB测试供应商1",
              deppid: "fe2b4cab21f84efb88b6524ad0b1ff5a",
              deppids: "0,fe2b4cab21f84efb88b6524ad0b1ff5a,",
              depremark: "",
              depsort: 0,
              id: 7
            },
            {
              depid: "f9026671922d4612b6a8c3c197d49914",
              depname: "汽车票资源开发组",
              deppid: "9c9ab920c7ef4a90b22b147ad01ff0e6",
              deppids:
                "0,fe2b4cab21f84efb88b6524ad0b1ff5a,f7f816aaed6c4ebca4974ec7d3449e76,9c9ab920c7ef4a90b22b147ad01ff0e6,",
              depremark: "",
              depsort: 0,
              id: 8
            },
            {
              depid: "e69c687cdf194611b9d14078f723904d",
              depname: "开发部",
              deppid: "9bb718910ec74a18bc77d5f6bfd620d2",
              deppids:
                "0,fe2b4cab21f84efb88b6524ad0b1ff5a,9bb718910ec74a18bc77d5f6bfd620d2,",
              depremark: "",
              depsort: 0,
              id: 9
            },
            {
              depid: "38d2729f3f1c4aa8a452aae55b9f7f98",
              depname: "地面交通前端组",
              deppid: "9c9ab920c7ef4a90b22b147ad01ff0e6",
              deppids:
                "0,fe2b4cab21f84efb88b6524ad0b1ff5a,f7f816aaed6c4ebca4974ec7d3449e76,9c9ab920c7ef4a90b22b147ad01ff0e6,",
              depremark: "",
              depsort: 0,
              id: 10
            },
            {
              depid: "b4215720d17d492c83e4860d78e94aab",
              depname: "地面交通测试组",
              deppid: "9c9ab920c7ef4a90b22b147ad01ff0e6",
              deppids:
                "0,fe2b4cab21f84efb88b6524ad0b1ff5a,f7f816aaed6c4ebca4974ec7d3449e76,9c9ab920c7ef4a90b22b147ad01ff0e6,",
              depremark: "",
              depsort: 0,
              id: 11
            },
            {
              depid: "8029fd6f39914abc9cbc95973cb1231d",
              depname: "人力部",
              deppid: "9bb718910ec74a18bc77d5f6bfd620d2",
              deppids:
                "0,fe2b4cab21f84efb88b6524ad0b1ff5a,9bb718910ec74a18bc77d5f6bfd620d2,",
              depremark: "",
              depsort: 0,
              id: 12
            },
            {
              depid: "b8d1454aa56a4470b4798fef59c3e830",
              depname: "公共流程架构组",
              deppid: "9c9ab920c7ef4a90b22b147ad01ff0e6",
              deppids:
                "0,fe2b4cab21f84efb88b6524ad0b1ff5a,f7f816aaed6c4ebca4974ec7d3449e76,9c9ab920c7ef4a90b22b147ad01ff0e6,",
              depremark: "",
              depsort: 0,
              id: 13
            },
            {
              depid: "9bb718910ec74a18bc77d5f6bfd620d2",
              depname: "用车项目部",
              deppid: "fe2b4cab21f84efb88b6524ad0b1ff5a",
              deppids: "0,fe2b4cab21f84efb88b6524ad0b1ff5a,",
              depremark: "",
              depsort: 0,
              id: 14
            },
            {
              depid: "16155b97d9b1409f9628186fd200a7f8",
              depname: "用车开发组",
              deppid: "9c9ab920c7ef4a90b22b147ad01ff0e6",
              deppids:
                "0,fe2b4cab21f84efb88b6524ad0b1ff5a,f7f816aaed6c4ebca4974ec7d3449e76,9c9ab920c7ef4a90b22b147ad01ff0e6,",
              depremark: "",
              depsort: 0,
              id: 15
            },
            {
              depid: "b7303b2206fa4cd08f27eac4c194cb3a",
              depname: "汽车票交易开发组",
              deppid: "9c9ab920c7ef4a90b22b147ad01ff0e6",
              deppids:
                "0,fe2b4cab21f84efb88b6524ad0b1ff5a,f7f816aaed6c4ebca4974ec7d3449e76,9c9ab920c7ef4a90b22b147ad01ff0e6,",
              depremark: "",
              depsort: 0,
              id: 16
            }
          ];

          this.scoreDepEntityList = scoreDepEntityList;
          axios
            .get(
              "http://localhost:8080/TCGroundTrafficIntegralAPI/scoreDep/getScoreDepartment"
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
        this.getScoreDepartment();
      }
    };
</script>
<style scoped>
    .mtb10 {
      margin: 10px 0;
    }
    .item-select {
      padding-top: 10px;
      padding-bottom: 10px;
      border: 0;
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
</style>

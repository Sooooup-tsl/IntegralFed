<template>
    <div class="page has-navbar" v-nav="{ title: '主页'}">
        <div class="page-content">
            <div class="page-cells">
                <cells :items="entrances" :on-cell-click="onCellClick" row="3"></cells>
            </div>

            <!-- <div>
                <tabs :tab-items="tabs" :tab-index="tabIndex" position="bottom" :on-tab-click="onTabClick"></tabs>
            </div> -->
            <button-group ref="button-group" :paramInfo="buttonParamInfo"></button-group>
        </div>
    </div>
</template>

<script scoped>
    import Vue from "vue";
    import buttonGroup from "../components/buttonGroup.vue";
    Vue.component(buttonGroup.name, buttonGroup);

    export default {
      data() {
        return {
          entrances: [
            '<div class="entrance assertive"><i class="icon ion-ios-search-strong"></i><br><span>积分查询</span></div>',
            '<div class="entrance energized"><i class="icon ion-stats-bars"></i><br><span>积分排名</span></div>',
            '<div class="entrance positive"><i class="icon ion-settings"></i><br><span>任务管理</span></div>',
            '<div class="entrance energized"><i class="icon ion-paper-airplane""></i><br><span>奖扣申请</span></div>',
            '<div class="entrance assertive"><i class="icon ion-flash"></i><br><span>奖扣下达</span></div>',
            '<div class="entrance calm"><i class="icon ion-edit"></i><br><span>奖扣审核</span></div>',
            '<div class="entrance balanced"><i class="icon ion-ios-book"></i><br><span>奖扣标准</span></div>'
            // '<div class="entrance positive"><i class="icon ion-ios-search"></i><br><span>搜索</span></div>'
          ],
          // 底部参数
          buttonParamInfo: {
            param: {
              pageTag: "0"
            }
          }
        };
      },
      methods: {
        onCellClick(cellIndex) {
          switch (cellIndex) {
            case 0:
              this.$router.push({ path: "/Jfcx" });

              break;
            case 1:
              this.$router.push({ path: "/Jfpm" });

              break;
            case 2:
              this.$router.push({ path: "/Rwgl" });

              break;
            case 3:
              this.$router.push({ path: "/Jksq" });

              break;
            case 4:
              this.$router.push({ path: "/Jkxd" });

              break;
            case 5:
              this.$router.push({ path: "/Jksh" });

              break;
            case 6:
              this.$router.push({ path: "/Jkbz" });

              break;

            default:
              break;
          }
        }
      }
    };
</script>

<style>
    .page-cells .entrance {
      height: 120px;
      padding: 35px 0;
    }

    .page-cells .entrance > .icon {
      font-size: 30px;
      line-height: 30px;
      width: 30px;
      height: 30px;
      margin-bottom: 6px;
    }

    .page-cells .entrance > span {
      font-size: 14px;
      line-height: 14px;
    }
</style>

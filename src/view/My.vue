<template>
    <div class="page has-navbar" v-nav="{ title: '我的'}">
        <div class="page-content">
            <div>
                <list>
                    <item>
                        个人账户
                        <span class="item-note">
                            {{list.name}}
                        </span>
                    </item>
                    <item>
                        入职时间
                        <span class="item-note">
                            {{list.time}}
                        </span>
                    </item>
                    <item>
                        工龄
                        <span class="item-note">
                            {{list.age}}
                        </span>
                    </item>
                    <item>
                        部门
                        <span class="item-note">
                            {{list.Bu}}
                        </span>
                    </item>
                    <item>
                        职务
                        <span class="item-note">
                            {{list.work}}
                        </span>
                    </item>
                    <item>
                        手机
                        <span class="item-note">
                            {{list.tel}}
                        </span>
                    </item>
                </list>
            </div>
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
          list: {
            name: "18136062247",
            time: "2016-03-03",
            age: "2",
            Bu: "前端",
            work: "小前端",
            tel: "18136062247"
          },
          // 底部参数
          buttonParamInfo: {
            param: {
              pageTag: "2"
            }
          }
        };
      },
      methods: {
        back() {
          history.back();
        }
      }
    };
</script>
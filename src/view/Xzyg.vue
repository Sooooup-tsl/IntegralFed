<template>
    <div class="page has-navbar" v-nav="{title: '选择员工', showBackButton: true, onBackButtonClick: back }">
        <div class="page-content">
            <search v-model="keywords" placeholder="请输入员工姓名搜索" :on-search="onSearch" :on-cancel="onCancel"></search>

            <!-- <div class="padding" v-show="searching">
                <span v-if="keywords">searching for '{{keywords}}'.</span>
            </div> -->
            <!-- 手风琴页面 -->
            <accordion>
                <accordion-item v-for="(list, index) in lists" :title="list.name" :key="list.id" content-height="110">
                    <div>
                        <list>
                            <item v-for="subList in list.subList" :key="subList.id" class="item-icon-left">
                                <i class="icon ion-social-github dark"></i>
                                {{subList.name}}
                            </item>
                        </list>
                    </div>
                </accordion-item>
            </accordion>
        </div>
    </div>
</template>
<script scoped>
    export default {
      data() {
        return {
          keywords: "",
          searching: false,
          lists: [
            {
              name: "地面交通前端组",
              subList: [{ name: "汤圣灵" }, { name: "汤圣灵" }]
            },
            {
              name: "地面交通测试组",
              subList: [{ name: "测试" }, { name: "测试" }]
            },
            {
              name: "汽车票交易开发组",
              subList: [{ name: "开发" }, { name: "开发" }]
            }
          ]
        };
      },

      methods: {
        back() {
          history.back();
        },
        onSearch(keywords) {
          this.searching = true;
        },
        onCancel() {
          this.searching = false;
          this.keywords = "";
        }
      }
    };
</script>
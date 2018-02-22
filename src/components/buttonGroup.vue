<template>
    <div>
        <tabs :tab-items="tabs" :tab-index="tabIndex" position="bottom" :on-tab-click="onTabClick"></tabs>
    </div>
</template>
<script scoped>
    export default {
      name: "button-group",
      data() {
        return {
          tabs: ["积分", "联系人", "我的"],
          tabIndex: 0
        };
      },
      props: {
        paramInfo: {
          type: Object,
          default: function() {
            return {
              param: {
                  
              }
            };
          }
        },
        model: Boolean
      },
      methods: {
        onTabClick(index) {
          switch (index) {
            case 0:
              this.$router.push({ path: "/Home" });

              break;
            case 1:
              this.$router.push({ path: "/contacts" });

              break;
            case 2:
              this.$router.push({ path: "/my" });

              break;
          }
          this.tabIndex = index;
        }
      },
      beforeMount() {
          var param = this.paramInfo.param;
          console.log(param.pageTag)
          this.tabIndex = Number(param.pageTag);
      }
    };
</script>

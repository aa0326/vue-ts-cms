<template>
  <div>
    <div class="nav-menu">
      <div class="logo">
        <img class="img" src="~assets/img/logo.svg" alt="" />
        <span v-if="!collapse" class="title">Vue3+TS</span>
      </div>
      <el-menu
        :default-active="defaultValue"
        class="el-menu-vertical"
        background-color="#oc2135"
        text-color="#b7bdc3"
        active-text-color="#0a60bd"
        :collapse="collapse"
      >
        <template v-for="item in userMenus" :key="item.id">
          <template v-if="item.type === 1">
            <el-sub-menu :index="item.id + ''">
              <template #title>
                <el-icon :class="item.icon" v-if="item.icon"
                  ><component
                    :is="item.icon.replace(/el-icon/g, '')"
                  ></component
                ></el-icon>
                <span>{{ item.name }}</span>
              </template>
              <template v-for="subitem in item.children" :key="subitem.id">
                <el-menu-item
                  :index="subitem.id + ''"
                  @click="handleMenuItemClick(subitem)"
                >
                  <!-- <i :class="subitem.icon" v-if="subitem.icon"></i> -->
                  <span>{{ subitem.name }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
          <template v-else-if="item.type === 2">
            <el-menu-item :index="item.id + ''">
              <!-- <i :class="item.icon" v-if="item.icon"></i> -->
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "@/store/index";
import { useRouter, useRoute } from "vue-router";
import { pathMapToMenu } from "@/utils/map-menus";

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    //vuex
    const store = useStore();
    const userMenus = computed(() => store.state.login.userMenus);
    //vue-router
    const router = useRouter();
    const route = useRoute();
    const currentPath = route.path;
    //data
    const menu = pathMapToMenu(userMenus.value, currentPath);
    const defaultValue = ref(menu.id + "");
    //event handle
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? "/not-found"
      });
    };
    return {
      userMenus,
      defaultValue,
      handleMenuItemClick
    };
  }
});
</script>

<style scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;
}
.nav-menu .logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.nav-menu .img {
  height: 100%;
  margin: 0 10px;
}

.nav-menu .title {
  font-size: 16px;
  font-weight: 700;
  color: white;
}
.el-menu {
  border-right: none;
}

.el-sub-menu {
  background-color: #001529 !important;
}
.el-sub-menu .el-menu-item {
  padding-left: 50px !important;
  background-color: #0c2135 !important;
}
.el-sub-menu ::v-deep .el-sub-menu__title {
  background-color: #001529 !important;
}

.el-sub-menu .el-menu-item:hover {
  color: #fff !important;
}

.el-sub-menu .el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
  color: #fff;
}
</style>

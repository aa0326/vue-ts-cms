<template>
  <div class="nav-header">
    <div class="left">
      <el-icon v-if="isFold"
        ><expand class="expand" @click="handleFoldClick"
      /></el-icon>
      <el-icon v-else><fold class="expand" @click="handleFoldClick" /></el-icon>
    </div>

    <div class="content">
      <hy-breadcrumb :breadcrumb="breadcrumbs"></hy-breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import userInfo from "./user-info.vue";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "@/store";
import { useRoute } from "vue-router";
import HyBreadcrumb, { IBreadcrumb } from "@/base-ui/breadcrumb";
import { pathMapBreadcrumbs } from "@/utils/map-menus";

export default defineComponent({
  components: {
    userInfo,
    HyBreadcrumb
  },
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };

    //面包屑的数据

    const breadcrumbs = computed(() => {
      const store = useStore();
      const userMenus = store.state.login.userMenus;
      const route = useRoute();
      const currentPath = route.path;
      return pathMapBreadcrumbs(userMenus, currentPath);
    });
    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    };
  }
});
</script>

<style scoped>
.nav-header {
  width: 100%;
  display: flex;
}
.nav-header .left {
  display: flex;
  align-items: center;
}
.nav-header .expand {
  height: 2em !important;

  cursor: pointer;
}
.nav-header .content {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
</style>

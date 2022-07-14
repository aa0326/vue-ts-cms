<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewDate"
      @editBtnClick="handleEditDate"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      pageName="role"
      :otherInfo="otherInfo"
      :defaultInfo="defaultInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue";
import { useStore } from "@/store";

import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import PageModal from "@/components/page-modal";

import { contentTableConfig } from "./config/content.config";
import { searchFormConfig } from "./config/search.config";
import { modalConfig } from "./config/modal.config";

import { usePageSearch } from "@/hooks/use-page-search";
import { usePageModal } from "@/hooks/use-page-modal";

import { MenuMapLeafKeys } from "@/utils/map-menus";
import { ElTree } from "element-plus";
export default defineComponent({
  name: "role",
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();
    //处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const editCallback = (item: any) => {
      nextTick(() => {
        const leftKeys = MenuMapLeafKeys(item.menuList);
        elTreeRef.value?.setCheckedKeys(leftKeys, false);
      });
    };
    const [pageModalRef, defaultInfo, handleNewDate, handleEditDate] =
      usePageModal(undefined, editCallback);
    const store = useStore();
    const menus = computed(() => store.state.entireMenu);
    const otherInfo = ref({});
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList };
    };
    return {
      contentTableConfig,
      searchFormConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewDate,
      handleEditDate,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    };
  }
});
</script>

<style scoped>
.menu-tree {
  margin-left: 40px;
}
</style>

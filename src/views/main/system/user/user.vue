<template>
  <div class="user">
    <div class="search">
      <page-search
        :searchFormConfig="searchFormConfig"
        @resetBtnClick="handleResetClick"
        @queryBtnClick="handleQueryClick"
      ></page-search>
    </div>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewDate"
      @editBtnClick="handleEditDate"
      pageName="users"
    ></page-content>
    <page-modal
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
      pageName="users"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import PageSearch from "@/components/page-search/index";
import PageContent from "@/components/page-content/index";
import PageModal from "@/components/page-modal/index";
import { modalConfig } from "./config/modal.config";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

import { usePageSearch } from "@/hooks/use-page-search";
import { usePageModal } from "@/hooks/use-page-modal";
import { useStore } from "vuex";
export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  name: "user",
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] =
      usePageSearch();

    //pageModal相关的hook逻辑
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      );
      passwordItem!.isHidden = false;
    };
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      );
      passwordItem!.isHidden = true;
    };
    const [pageModalRef, defaultInfo, handleNewDate, handleEditDate] =
      usePageModal(newCallback, editCallback);
    //动态获取部门列表和角色列表
    const store = useStore();
    const modalConfigRef = computed(() => {
      const deparmentItem = modalConfig.formItems.find(
        (item) => item.field === "departmentId"
      );
      deparmentItem!.options = store.state.entireDepartment.map((item: any) => {
        return { label: item.name, value: item.id };
      });
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === "roleId"
      );
      roleItem!.options = store.state.entireRole.map((item: any) => {
        return { label: item.name, value: item.id };
      });

      return modalConfig;
    });
    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfigRef,
      handleNewDate,
      handleEditDate,
      pageModalRef,
      defaultInfo
    };
  }
});
</script>

<style scoped></style>

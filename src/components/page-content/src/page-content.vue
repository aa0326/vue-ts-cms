<template>
  <div class="page-content">
    <hy-table
      :listData="listData"
      v-bind="contentTableConfig"
      :listCount="listCount"
      v-model:page="pageInfo"
    >
      <!--header中的插槽-->
      <template #headerHandler>
        <el-button v-if="isCreate" type="primary" @click="handleNewClick">
          新建用户
        </el-button>
      </template>
      <!--列中的插槽-->
      <template #status="scoped">
        <el-button
          plain
          size="small"
          :type="scoped.row.enable ? 'success' : 'danger'"
        >
          {{ scoped.row.enable ? "启用" : "禁用" }}
        </el-button>
      </template>
      <template #createAt="scoped">
        <span>
          {{ $filters.formatTime(scoped.row.createAt) }}
        </span>
      </template>
      <template #updateAt="scoped">
        <span>
          {{ $filters.formatTime(scoped.row.updateAt) }}
        </span>
      </template>
      <template #handler="scoped">
        <el-button
          size="small"
          type="text"
          v-if="isUpdate"
          @click="handleEditClick(scoped.row)"
        >
          <el-icon><edit-pen /></el-icon>编辑
        </el-button>
        <el-button
          size="small"
          type="text"
          v-if="isDelete"
          @click="handleDeleteClick(scoped.row)"
        >
          <el-icon><delete-filled /></el-icon>删除
        </el-button>
      </template>

      <!--动态插槽-->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scoped"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scoped.row"> </slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "@/store";
import { usePermission } from "@/hooks/use-permission";
import HyTable from "@/base-ui/table";
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    HyTable
  },
  emits: ["newBtnClick", "editBtnClick"],
  setup(props, { emit }) {
    const store = useStore();
    //0.获取操作的权限
    const isCreate = usePermission(props.pageName, "create");
    const isUpdate = usePermission(props.pageName, "update");
    const isDelete = usePermission(props.pageName, "delete");
    const isQuery = usePermission(props.pageName, "query");
    //1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    watch(pageInfo, () => {
      getPageData();
    });
    //2.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return false;
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      });
    };
    getPageData();
    //3.vuex中获取数据
    const listData = computed(() =>
      store.getters[`system/getListData`](props.pageName)
    );
    const listCount = computed(() =>
      store.getters[`system/getListCount`](props.pageName)
    );

    //4.获取动态插槽
    const otherPropSlots = props.contentTableConfig.propList.filter(
      (item: any) => {
        if (item.slotName === "status") return false;
        if (item.slotName === "createAt") return false;
        if (item.slotName === "updateAt") return false;
        if (item.slotName === "handler") return false;

        return true;
      }
    );

    //5.删除/编辑/新建操作
    const handleDeleteClick = (item: any) => {
      store.dispatch("system/deletePageDataAction", {
        pageName: props.pageName,
        id: item.id
      });
    };
    const handleNewClick = () => {
      emit("newBtnClick");
    };
    const handleEditClick = (item: any) => {
      emit("editBtnClick", item);
    };
    return {
      listData,
      getPageData,
      listCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    };
  }
});
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>

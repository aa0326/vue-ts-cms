<template>
  <div>
    <div class="table">
      <div class="header">
        <slot name="header">
          <div class="title">{{ title }}</div>
          <div class="handler">
            <slot name="headerHandler"></slot>
          </div>
        </slot>
      </div>

      <el-table
        :data="listData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border
        v-bind="childrenProps"
      >
        <el-table-column
          v-if="showSelectColumn"
          type="selection"
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="showIndexColumn"
          type="index"
          label="序号"
          align="center"
          width="80"
        ></el-table-column>
        <template v-for="propItem in propList" :key="propItem.label">
          <el-table-column
            :prop="propItem.prop"
            :label="propItem.label"
            :min-width="propItem.minWidth"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template #default="scoped">
              <slot :name="propItem.slotName" :row="scoped.row">
                {{ scoped.row[propItem.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>

      <div class="footer" v-if="showFooter">
        <slot name="footer">
          <el-pagination
            :current-page="page.currentPage"
            :page-size="page.pageSize"
            :page-sizes="[10, 20, 30]"
            :small="small"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="listCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String
    },
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      required: false
    },
    showSelectColumn: {
      type: Boolean,
      required: false
    },
    listCount: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ["handleSelectionChange", "update:page"],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit("handleSelectionChange", value);
    };
    const handleSizeChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize });
    };
    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage });
    };
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>
<style>
.el-table .el-table__cell {
  z-index: auto !important;
}
</style>
<style scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
}
.header .title {
  font-size: 20px;
  font-weight: 700;
}

.header .handler {
  align-items: center;
}
.footer {
  margin-top: 15px;
}
.footer .el-pagination {
  text-align: right;
}
.el-table .el-table__cell .is-center {
  z-index: auto !important;
}
</style>

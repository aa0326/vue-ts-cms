<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2>高级检索</h2>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handlerQueryClick">搜索</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HyForm from "@/base-ui/form/index";
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    HyForm
  },
  emits: ["resetBtnClick", "queryBtnClick"],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData);
    //重置按钮
    const handleResetClick = () => {
      //方式一
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key];
      }
      emit("resetBtnClick", formData);
    };
    //搜索按钮
    const handlerQueryClick = () => {
      emit("queryBtnClick", formData);
    };
    return {
      formData,
      handleResetClick,
      handlerQueryClick
    };
  }
});
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0px 50px 20px 0px;
}
</style>

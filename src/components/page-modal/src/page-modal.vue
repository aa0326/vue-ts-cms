<template>
  <div class="page-model">
    <el-dialog
      v-model="dialogVisible"
      title="提示"
      width="30%"
      destroy-on-close
      center
    >
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <slot> </slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import HyForm from "@/base-ui/form/index";
export default defineComponent({
  components: {
    HyForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false);
    const formData = ref<any>({});
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );
    //点击确定按钮的逻辑
    const store = useStore();
    const handleConfirmClick = () => {
      dialogVisible.value = true;
      if (Object.keys(props.defaultInfo).length) {
        //编辑
        store.dispatch("system/editPageDataAction", {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        });
      } else {
        //新建
        store.dispatch("system/createPageDataAction", {
          pageName: props.pageName,
          queryInfo: { ...formData.value, ...props.otherInfo }
        });
      }
      dialogVisible.value = false;
    };
    return {
      dialogVisible,
      formData,
      handleConfirmClick
    };
  }
});
</script>

<style scoped></style>

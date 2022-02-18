<template>
  <div class="nav-header">
    <div class="left">
      <el-icon v-if="isFold"
        ><expand class="expand" @click="handleFoldClick"
      /></el-icon>
      <el-icon v-else><fold class="expand" @click="handleFoldClick" /></el-icon>
    </div>

    <div class="content">
      <div>面包屑</div>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import userInfo from "./user-info.vue";
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: {
    userInfo
  },
  emits: ["foldChange"],
  setup(props, { emit }) {
    const isFold = ref(false);
    const handleFoldClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };
    return {
      isFold,
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

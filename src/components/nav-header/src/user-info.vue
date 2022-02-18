<template>
  <div>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-avatar size="small" :src="circleUrl"></el-avatar
        ><span>{{ name }}</span
        ><el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <span @click="handleOutLoginClick">
              <el-icon size="10"><close-bold /></el-icon>
              退出登录
            </span>
          </el-dropdown-item>
          <el-dropdown-item divided></el-dropdown-item>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/store";
import localCache from "@/utils/cache";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const store = useStore();
    const name = store.state.login.userInfo.name;
    const circleUrl =
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
    const router = useRouter();
    const handleOutLoginClick = () => {
      localCache.deleteCache("token");
      localCache.deleteCache("userInfo");
      localCache.deleteCache("userMenus");
      router.push("/login");
    };
    return {
      name,
      circleUrl,
      handleOutLoginClick
    };
  }
});
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.el-dropdown-link span {
  margin-right: 5px;
}
</style>

<template>
  <div>
    <el-form label-width="60px" :rules="rules" :model="account" ref="fromRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="account.password"
          type="password"
          :show-password="true"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from "element-plus/lib/components";
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";

import { rules } from "../config/account-config";
import localCache from "@/utils/cache";
export default defineComponent({
  setup() {
    const store = useStore();
    const account = reactive({
      name: localCache.getCache("name") ?? "",
      password: localCache.getCache("password") ?? ""
    });

    const fromRef = ref<InstanceType<typeof ElForm>>();
    const loginAction = (isKeepPassword: boolean) => {
      fromRef.value?.validate((valid) => {
        if (valid) {
          //1.判断是否需要记住密码
          if (isKeepPassword) {
            //本地缓存
            localCache.setCache("name", account.name);
            localCache.setCache("password", account.password);
          } else {
            localCache.deleteCache("name");
            localCache.deleteCache("password");
          }
          //2.开始进行验证登录
          store.dispatch("login/accountLoginAction", { ...account });
        }
      });
    };

    return {
      account,
      rules,
      loginAction,
      fromRef
    };
  }
});
</script>

<style scoped></style>

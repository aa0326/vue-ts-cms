<template>
  <div class="user">
    <div class="search">
      <hy-form v-bind="fromConfig"></hy-form>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HyForm from "@/base-ui/form/index";
import { fromConfig } from "./config/search.config";
export default defineComponent({
  components: {
    HyForm
  },
  name: "user",
  setup() {
    return {
      fromConfig
    };
  }
});
</script>

<style scoped></style>

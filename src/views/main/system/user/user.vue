<template>
  <div class="user">
    <div class="search">
      <page-search :searchFormConfig="fromConfig"></page-search>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageSearch from "@/components/page-search/index";
import { fromConfig } from "./config/search.config";
export default defineComponent({
  components: {
    PageSearch
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

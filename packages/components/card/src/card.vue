<template>
  <div class="stark-card" :style="width ? { width: width + 'px' } : {}">
    <!-- 卡片图片 -->
    <div
      class="stark-card-img"
      :style="imgHeight ? { height: imgHeight + 'px' } : {}"
    >
      <img :src="imgSrc" alt="img" />
    </div>
    <!-- 卡片描述 -->
    <!-- 卡片描述会有两种情况： -->
    <!-- 1. 通过 props 传递过来 -->
    <!-- 2. 通过 slot 插槽来设置 -->
    <div v-if="summary" class="stark-card-summary">
      {{ summary }}
    </div>
    <div v-else class="stark-card-summary">
      <slot></slot>
    </div>
    <!-- 最后指定卡片的 footer -->
    <div class="stark-card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { cardProps } from "./card";
export default defineComponent({
  name: "starkCard",
  props: cardProps,
  setup() {
    return {};
  },
});
</script>

<style scoped></style>


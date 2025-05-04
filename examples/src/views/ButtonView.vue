<template>
  <div>
    <!-- 测试按钮组件 -->
    <div class="row">
      <stark-button>普通按钮</stark-button>
      <stark-button type="primary">primary按钮</stark-button>
      <stark-button type="success">success按钮</stark-button>
      <stark-button type="info">info按钮</stark-button>
      <stark-button type="danger">danger按钮</stark-button>
      <stark-button type="warning">warning按钮</stark-button>
    </div>
    <!-- 测试 plain 属性 -->
    <div class="row">
      <stark-button plain>普通按钮</stark-button>
      <stark-button plain type="primary">primary按钮</stark-button>
      <stark-button plain type="success">success按钮</stark-button>
      <stark-button plain type="info">info按钮</stark-button>
      <stark-button plain type="danger">danger按钮</stark-button>
      <stark-button plain type="warning">warning按钮</stark-button>
    </div>
    <!-- 测试 round 属性 -->
    <div class="row">
      <stark-button round>按钮</stark-button>
      <stark-button round type="primary">primary按钮</stark-button>
      <stark-button round type="success">success按钮</stark-button>
      <stark-button plain round type="info">info按钮</stark-button>
      <stark-button plain round type="danger">danger按钮</stark-button>
      <stark-button plain round type="warning">warning按钮</stark-button>
    </div>
    <!-- 测试 diabled 属性 -->
    <div class="row">
      <stark-button disabled>按钮</stark-button>
      <stark-button disabled type="primary">primary按钮</stark-button>
      <stark-button disabled type="success">success按钮</stark-button>
      <stark-button disabled round type="info">info按钮</stark-button>
      <stark-button disabled round type="danger">danger按钮</stark-button>
      <stark-button disabled round type="warning">warning按钮</stark-button>
    </div>
    <!-- 测试 circle 属性 -->
    <div class="row">
      <stark-button round circle>好</stark-button>
      <stark-button round circle type="primary">好</stark-button>
      <stark-button round circle type="success">学</stark-button>
      <stark-button plain round circle type="info">习</stark-button>
      <stark-button plain round circle type="danger">前</stark-button>
      <stark-button plain round circle type="warning">端</stark-button>
    </div>
    <!-- 测试图标 -->
    <div class="row">
      <stark-button icon="milk-tea"></stark-button>
      <stark-button type="primary" icon="camera">照相机</stark-button>
      <stark-button type="success" icon="wind-power" circle></stark-button>
      <stark-button type="info" icon="orange"></stark-button>
      <stark-button type="danger" icon="goblet"></stark-button>
      <stark-button type="warning" icon="cloudy"></stark-button>
      <stark-button type="info" plain icon="milk-tea">奶茶</stark-button>
    </div>
    <!-- 测试事件 -->
    <div class="row">
      <stark-button type="primary" plain @click="handleClick('xiejie', $event)">click</stark-button>
    </div>
  </div>
</template>

<script setup lang="ts">
function handleClick(name: string, event: Event){
  alert(name);
  console.log(event);
}
</script>

<style scoped lang="scss">
.row {
  margin-bottom: 20px;
  width: 800px;
  display: flex;
  justify-content: space-evenly;
  margin: 20px auto;
}
</style>


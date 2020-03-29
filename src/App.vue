<template>
  <div>
    <keep-alive :include="['home']">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {}
</script>

<style></style>

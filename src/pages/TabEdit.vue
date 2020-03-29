<template>
  <div class="tab-edit">
    <hm-header>栏目管理</hm-header>

    <div class="content">
      <p class="title">点击删除以下频道(至少保留3个)</p>
      <div class="list">
        <div
          class="item"
          v-for="item in activeTabs"
          :key="item.id"
          @click="del(item.id)"
        >
          {{ item.name }}
        </div>
      </div>

      <p class="title">点击添加以下频道</p>
      <div class="list">
        <div
          class="item"
          v-for="item in deactiveTabs"
          :key="item.id"
          @click="add(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { create } from 'domain'
export default {
  data() {
    return {
      activeTabs: [],
      deactiveTabs: []
    }
  },

  async created() {
    const activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
    const deactiveTabs = JSON.parse(localStorage.getItem('deactiveTabs'))
    if (activeTabs && deactiveTabs) {
      this.activeTabs = activeTabs
      this.deactiveTabs = deactiveTabs
      return
    }
    const res = await this.$axios.get('/category')
    console.log(res.data)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.activeTabs = data
      this.deactiveTabs = []
    }
  },

  methods: {
    del(id) {
      if (this.activeTabs.length <= 3) {
        this.$toast('请至少保留3个')
        return
      }
      const idx = this.activeTabs.findIndex(item => item.id === id)
      this.deactiveTabs.push(this.activeTabs[idx])
      this.activeTabs.splice(idx, 1)
    },
    add(id) {
      const idx = this.deactiveTabs.findIndex(item => item.id === id)
      this.activeTabs.push(this.deactiveTabs[idx])
      this.deactiveTabs.splice(idx, 1)
    }
  },

  watch: {
    activeTabs: {
      deep: true,
      handler(value) {
        localStorage.setItem('activeTabs', JSON.stringify(this.activeTabs))
        localStorage.setItem('deactiveTabs', JSON.stringify(this.deactiveTabs))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
  .title {
    color: #999;
    font-size: 14px;
  }
  .list {
    margin-top: 10px;
    overflow: hidden;
    .item {
      padding: 10px 15px;
      border: 1px solid #ccc;
      float: left;
      background-color: #ddd;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>

<template>
  <div class="home">
    <div class="header">
      <div class="left">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="center">
        <span class="iconfont iconsearch"></span>
        <span class="text">搜索新闻</span>
      </div>
      <div class="right" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>

    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="tab.name" v-for="tab in tabList" :key="tab.id">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          :offset="50"
        >
          <hm-post
            v-for="post in postList"
            :key="post.id"
            :post="post"
          ></hm-post>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabList: [],
      postList: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false
    }
  },
  async created() {
    const res = await this.$axios.get('/category')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.tabList = data
      this.getPostList(this.tabList[this.active].id)
    }
  },
  methods: {
    // async getTabList() {
    //   const res = await this.$axios.get('/category')
    //   const { statusCode, data } = res.data
    //   if (statusCode === 200) {
    //     this.tabList = data
    //     // console.log(this.tabList)
    //     this.getPostList(this.tabList[this.active].id)
    //   }
    // },
    async getPostList(id) {
      // console.log('我需要获取分类id为', id, '下面的文章数据')
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })

      if (this.postList.length > 0 && this.pageIndex === 1) {
        this.postList = []
      }

      const { statusCode, data } = res.data
      this.postList = [...this.postList, ...data]

      this.loading = false
      if (data.length < this.pageSize) {
        this.finished = true
      }
    },

    onLoad() {
      const id = this.tabList[this.active].id
      setTimeout(() => {
        this.pageIndex++
        this.getPostList(id)
      }, 1000)
    }
  },
  watch: {
    active(value) {
      this.postList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        const id = this.tabList[value].id
        this.getPostList(id)
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  line-height: 50px;
  background-color: #ff0000;
  color: #fff;
  display: flex;
  padding-left: 10px;
  align-items: center;
  .left,
  .right {
    width: 60px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .iconnew {
    font-size: 50px;
  }
  .iconwode {
    font-size: 24px;
  }
  .center {
    flex: 1;
    height: 34px;
    line-height: 34px;
    background-color: rgba(255, 255, 255, 0.5);
    text-align: center;
    border-radius: 17px;
    .text {
      font-size: 14px;
      margin-left: 5px;
    }
  }
}

// 覆盖tab栏的样式
// 深度作用选择器
/deep/ .van-tabs__nav {
  background-color: #ddd;
}
</style>

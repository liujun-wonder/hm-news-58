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
      <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
        <!-- <p v-for="item in 20" :key="item">内容1</p> -->
        <div class="my-star">
          <div class="list">
            <div class="item" v-for="item in postList" :key="item.id">
              <div class="info">
                <div class="title">{{ item.title }}</div>
                <div class="bottom">
                  <span>{{ item.user.nickname }}</span>
                  <span>{{ item.comment_length }} 跟帖</span>
                </div>
              </div>
              <img :src="item.cover[0].url" alt="" />
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
      tabList: [],
      postList: []
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    async getTabList() {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // console.log(this.tabList)
        this.getPostList(this.tabList[this.active].id)
      }
    },
    async getPostList(id) {
      // console.log('我需要获取分类id为', id, '下面的文章数据')
      const res = await this.$axios.get('/post', {
        params: {
          category: id
        }
      })

      // console.log(res.data)
      const { statusCode, data } = res.data
      this.postList = data
      console.log(this.postList)
    }
  },
  watch: {
    active(value) {
      const id = this.tabList[value].id
      this.getPostList(id)
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

.item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 16px;
    }
    .bottom {
      font-size: 12px;
      color: #999;
      span {
        margin-right: 10px;
      }
    }
  }
  img {
    width: 121px;
    height: 75px;
    display: block;
    // 可以让图片等比例的压缩 取值:cover  contain
    // 类似于 background-size: cover contain
    object-fit: cover;
  }
}
</style>

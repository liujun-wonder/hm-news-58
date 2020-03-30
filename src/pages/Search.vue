<template>
  <div class="search">
    <!-- 头部搜索区 -->
    <div class="header">
      <div class="left" @click="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input
          type="text"
          placeholder="请输入搜索的内容"
          v-model="keyword"
          @keyup.enter="search"
          @input="recommend"
        />
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>

    <!-- 推荐列表 -->
    <div class="recommend" v-if="recommendList.length">
      <div
        class="item one-txt-cut"
        v-for="item in recommendList"
        :key="item.id"
        @click="history_search(item.title)"
      >
        {{ item.title }}
      </div>
    </div>

    <!-- 搜索列表 -->
    <div class="post-list" v-else-if="postList.length">
      <hm-post v-for="post in postList" :key="post.id" :post="post"></hm-post>
    </div>

    <div class="content" v-else>
      <div class="wrapper">
        <h3>历史记录</h3>
        <span @click="clearHistory">清空</span>
      </div>
      <div class="list">
        <div
          class="item"
          @click="history_search(item)"
          v-for="item in history"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
      <h3>热门搜索</h3>
      <div class="list">
        <div
          class="item"
          @click="history_search(item)"
          v-for="item in hotList"
          :key="item"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      keyword: '',
      postList: [],
      history: [],
      hotList: [],
      recommendList: []
    }
  },

  created() {
    const history = localStorage.getItem('history')
    if (history) {
      this.history = JSON.parse(history)
    }

    this.hotList = ['情火', '亲爱的', '新冠肺炎', '复工']
  },

  methods: {
    async search() {
      this.recommendList = []
      this.history = this.history.filter(item => item !== this.keyword)
      this.history.unshift(this.keyword)
      if (this.history.length >= 8) {
        this.history = this.history.slice(0, 8)
      }
      localStorage.setItem('history', JSON.stringify(this.history))
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword,
          pageIndex: 1,
          pageSize: 6
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postList = data
      }
    },

    history_search(item) {
      this.keyword = item
      this.search()
    },
    back() {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.go(-1)
      }
    },

    recommend: _.debounce(async function() {
      console.log('发送请求了')
      if (!this.keyword) return
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommendList = data
      }
    }, 500),

    async clearHistory() {
      //这里是数据的变化引起的页面变化
      const history = localStorage.getItem('history')
      if (!history) return
      // this.$dialog
      //   .confirm({
      //     title: '温馨提示',
      //     message: '你确定要清空历史记录吗'
      //   })
      //   .then(() => {
      //     localStorage.removeItem('history')
      //     this.history = []
      //     this.keyword = ''
      //     this.$toast('清空成功')
      //   })
      //   .catch(() => {
      //     this.$toast('取消清空')
      //   })
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要清空历史记录吗'
        })
        localStorage.removeItem('history')
        this.history = []
        this.keyword = ''
        this.$toast('清空成功')
      } catch {
        this.$toast('取消清空')
      }
    }
  },

  watch: {
    keyword(value) {
      if (!value) {
        this.postList = []
        this.recommendList = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  position: relative;
  .header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    padding: 0 20px;
    display: flex;
    align-items: center;
    .center {
      flex: 1;
      padding: 0 10px;
      position: relative;
      display: flex;
      input {
        flex: 1;
        height: 34px;
        line-height: 34px;
        border-radius: 17px;
        border: none;
        outline: none;
        border: 1px solid #ccc;
        padding-left: 30px;
        font-size: 12px;
      }
      .iconfont {
        position: absolute;
        top: 0;
        left: 20px;
        line-height: 34px;
      }
    }
    .right {
      font-size: 14px;
    }
  }
  .content {
    padding: 20px;
    .wrapper {
      display: flex;
      align-items: center;
      span {
        margin-left: 200px;
        padding: 5px;
        background-color: #eee;
        border-radius: 5px;
      }
      h3 {
        float: left;
      }
    }
    h3 {
      padding: 10px 0;
      font-size: 20px;
    }
    .list {
      overflow: hidden;
      .item {
        font-size: 14px;
        border: 1px solid #ccc;
        background-color: #ddd;
        padding: 5px 10px;
        float: left;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }

  .recommend {
    position: absolute;
    z-index: 999;
    background-color: #fff;
    width: 100%;
    .item {
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>

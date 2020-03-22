<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <div class="info" @click="$router.push('/edit')">
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
      </div>
      <div class="center">
        <div class="name">
          <span v-if="info.gender === 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{ info.nickname }}</span>
        </div>
        <div class="time">{{ info.create_date | date }}</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>

    <hm-navbar
      title="我的关注"
      @click="$router.push('/my-follow')"
      content="关注的用户"
    ></hm-navbar>
    <hm-navbar
      title="我的跟帖"
      @click="$router.push('/my-comments')"
      content="跟帖/回复"
    ></hm-navbar>
    <hm-navbar
      title="我的收藏"
      content="文章/视频"
      @click="$router.push('/my-star')"
    ></hm-navbar>
    <hm-navbar title="设置" @click="$router.push('/edit')"></hm-navbar>
    <hm-navbar title="退出" @click="logout"></hm-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  async created() {
    const user_id = localStorage.getItem('user_id')
    const token = localStorage.getItem('token')

    const res = await this.$axios({
      methos: 'get',
      url: `/user/${user_id}`,
      headers: {
        Authorization: token
      }
    })
    // console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.info = data
      console.log(this.info)
    }
  },
  methods: {
    async logout() {
      try {
        const res = await this.$dialog.confirm({
          title: '温馨提示',
          message: '你确定要退出本系统吗'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch {
        this.$toast('取消退出')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .info {
    display: flex;
    height: 100px;
    border-bottom: 3px solid #ccc;
    align-items: center;
    padding: 0 20px;
    .left {
      width: 70px;
      img {
        width: 70px;
        height: 70px;
        display: block;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      padding-left: 10px;
      .name {
        span {
          font-size: 18px;
        }
      }
      .time {
        font-size: 14px;
        color: #999;
      }
      .iconxingbienan {
        color: blue;
      }
      .iconxingbienv {
        color: pink;
      }
    }
    .right {
      width: 30px;
      text-align: right;
    }
  }
}
</style>

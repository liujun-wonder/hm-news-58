<template>
  <div class="post-detail" :class="isShow ? 'pd140' : 'pd50'">
    <div class="header">
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div
          class="followed"
          v-if="detail.has_follow"
          @click="unfollow(detail.user.id)"
        >
          已关注
        </div>
        <div class="follow" v-else @click="follow(detail.user.id)">关注</div>
      </div>
    </div>

    <div class="detail-content">
      <div class="title">{{ detail.title }}</div>
      <div class="user">
        <span>{{ detail.user.nickname }}</span>
        <span>{{ detail.create_date | date }}</span>
      </div>

      <div
        v-if="detail.type === 1"
        class="content"
        v-html="detail.content"
      ></div>
      <video v-else :src="detail.content" controls autoplay muted></video>

      <div class="btns">
        <div
          class="btn like"
          :class="{ active: detail.has_like }"
          @click="like"
        >
          <span class="iconfont icondianzan"></span>
          <span>{{ detail.like_length || 0 }}</span>
        </div>

        <div class="btn share">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>

    <!-- 跟帖列表 -->
    <div class="comment-list">
      <div class="title">精彩跟帖</div>
      <hm-comment
        v-for="item in commentList"
        :key="item.id"
        :comment="item"
        @reply="reply"
      ></hm-comment>
    </div>

    <div class="footer">
      <div class="input" v-if="!isShow">
        <input type="text" placeholder="写跟帖" @focus="handleFocus" />
        <span class="iconfont iconpinglun-">
          <span>{{ detail.comment_length }}</span>
        </span>
        <span
          class="iconfont iconshoucang"
          :class="{ active: detail.has_star }"
          @click="star"
        ></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
      <div class="textarea" v-else>
        <textarea
          :placeholder="`回复:${replyNickname}`"
          @blur="handleBlur"
          ref="textarea"
          v-model="content"
        ></textarea>
        <div class="send" @click="addComment">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {
        user: {}
      },
      isShow: false,
      commentList: [],
      replyId: '',
      replyNickname: '',
      content: ''
    }
  },

  created() {
    this.getDetail()
    this.getComments()
  },

  methods: {
    async getDetail() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.detail = data
        // console.log(this.detail)
      }
    },

    async getComments() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    },

    async follow(id) {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          name: 'login',
          params: {
            back: true
          }
        })
        this.$toast('请先登录')
        return
      }

      const res = await this.$axios.get(`/user_follows/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('关注成功')
        this.detail.has_follow = true
      }
    },

    async unfollow(id) {
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('取关成功')
        this.getDetail()
      }
    },

    async like() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          name: 'login',
          params: {
            back: true
          }
        })
        this.$toast('请先登录')
        return
      }

      const res = await this.$axios.get(`/post_like/${this.detail.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getDetail()
      }
    },

    async star() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          name: 'login',
          params: { back: true }
        })
        this.$toast('请先登录')
        return
      }

      const res = await this.$axios.get(`/post_star/${this.detail.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getDetail()
      }
    },

    async handleFocus() {
      this.isShow = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },

    handleBlur() {
      if (!this.content) {
        this.isShow = false
        this.replyId = ''
        this.replyNickname = ''
      }
    },

    async reply(id, nickname) {
      this.replyId = id
      this.replyNickname = nickname
      this.isShow = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },

    async addComment() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          name: 'login',
          params: {
            back: true
          }
        })
        this.$toast('请先登录')
        return
      }

      const res = await this.$axios({
        method: 'post',
        url: `/post_comment/${this.detail.id}`,
        data: {
          content: this.content,
          parent_id: this.replyId
        }
      })
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.content = ''
        this.isShow = false
        this.replyId = ''
        this.replyNickname = ''
        this.getComments()
        this.getDetail()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pd140 {
  padding-bottom: 140px;
}
.pd50 {
  padding-bottom: 50px;
}
.header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  padding: 0 20px;
  align-items: center;
  .center {
    height: 50px;
    line-height: 50px;
    padding-left: 5px;
    flex: 1;
    .iconfont {
      font-size: 40px;
    }
  }
  .followed {
    border: 1px solid #ccc;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    padding: 0 15px;
  }
  .follow {
    height: 30px;
    line-height: 30px;
    border: 1px solid #ff0000;
    background-color: #ff0000;
    color: #fff;
    border-radius: 15px;
    padding: 0 15px;
  }
}
.detail-content {
  padding: 0 20px;
  .title {
    font-weight: 700;
    font-size: 24px;
    padding: 20px 0;
  }
  .user {
    color: #999;
    font-size: 14px;
    margin-bottom: 20px;
    span {
      margin-right: 10px;
    }
  }
  /deep/ img {
    width: 100%;
    display: block;
  }
  .content {
    font-size: 14px;
  }
  video {
    width: 100%;
  }
}
.btns {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
  .btn {
    width: 80px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #000;
    padding: 0 15px;
    border-radius: 15px;
    text-align: center;
    font-size: 14px;
    span:first-child {
      margin-right: 5px;
    }
    &.active {
      border-color: red;
      color: red;
      display: block;
    }
  }
  .share {
    color: #00c800;
    border: 1px solid #00c800;
  }
}

.comment-list {
  border-top: 3px solid #ccc;
  .title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    padding: 20px 0;
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  .input {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    border-top: 1px solid #ccc;
    input {
      height: 30px;
      width: 180px;
      background-color: #ddd;
      border-radius: 15px;
      outline: none;
      border: none;
      padding-left: 20px;
    }
    .iconfont {
      font-size: 22px;
    }
    .active {
      color: red;
    }
    .iconpinglun- {
      position: relative;
      span {
        position: absolute;
        font-size: 12px;
        background-color: red;
        color: #fff;
        top: -7px;
        left: 9px;
        padding: 0 5px;
      }
    }
  }
  .textarea {
    border-top: 1px solid #ccc;
    display: flex;
    height: 100px;
    display: flex;
    align-items: flex-end;
    padding: 20px;
    textarea {
      flex: 1;
      height: 80px;
      background-color: #ddd;
      border-radius: 10px;
      padding: 10px;
      border: none;
      outline: none;
      resize: none;
    }
    .send {
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      border-radius: 15px;
      background-color: red;
      color: #fff;
      margin: 0 10px;
    }
  }
}
</style>

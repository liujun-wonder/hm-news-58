<template>
  <div class="hm-comment">
    <div class="header">
      <div class="left">
        <img :src="$axios.defaults.baseURL + comment.user.head_img" alt="" />
      </div>
      <div class="center">
        <div class="name">{{ comment.user.nickname }}</div>
        <div class="time">{{ comment.create_date | date2 }}</div>
      </div>
      <div class="right" @click="reply(comment.id, comment.user.nickname)">
        回复
      </div>
    </div>

    <hm-floor
      @reply="reply"
      :count="getCount(0, comment)"
      v-if="comment.parent"
      :comment="comment.parent"
    ></hm-floor>

    <div class="content">{{ comment.content }}</div>
  </div>
</template>

<script>
import HmFloor from './HmFloor'
export default {
  props: {
    comment: Object
  },
  components: {
    HmFloor
  },
  methods: {
    getCount(num, obj) {
      if (obj.parent) {
        return this.getCount(num + 1, obj.parent)
      } else {
        return num
      }
    },
    reply(id, nickname) {
      this.$emit('reply', id, nickname)
    }
  }
}
</script>

<style lang="less" scoped>
.hm-comment {
  border-bottom: 1px solid #ccc;
  padding: 20px;
  align-items: center;
  .header {
    display: flex;
    margin-bottom: 10px;
    .left {
      img {
        width: 50px;
        height: 50px;
        display: block;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      padding-left: 10px;
      .name {
        font-size: 16px;
        margin-top: 5px;
      }
      .time {
        font-size: 14px;
        color: #999;
      }
    }
    .right {
      margin-top: 5px;
      color: #999;
      font-size: 14px;
    }
  }

  .content {
    font-size: 16px;
    margin-top: 10px;
  }
}
</style>

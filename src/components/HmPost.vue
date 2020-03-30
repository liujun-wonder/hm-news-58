<template>
  <div class="hm-post" @click="$router.push(`/post-detail/${post.id}`)">
    <div class="video-post" v-if="post.type === 2">
      <div class="title">{{ post.title }}</div>
      <div class="video">
        <img :src="fixedUrl(post.cover[0].url)" alt="" />
        <div class="play">
          <span class="iconfont iconshipin"></span>
        </div>
      </div>
      <div class="bottom">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comment_length }}跟帖</span>
      </div>
    </div>

    <div class="single-img-post" v-else-if="post.cover.length < 3">
      <div class="info">
        <div class="title">{{ post.title }}</div>
        <div class="bottom">
          <span>{{ post.user.nickname }}</span>
          <span>{{ post.comment_length }}跟帖</span>
        </div>
      </div>
      <img :src="fixedUrl(post.cover[0].url)" alt="" />
    </div>

    <div class="multiple-img-post" v-else>
      <div class="title">{{ post.title }}</div>
      <div class="imgs">
        <img :src="fixedUrl(post.cover[0].url)" alt="" />
        <img :src="fixedUrl(post.cover[0].url)" alt="" />
        <img :src="fixedUrl(post.cover[0].url)" alt="" />
      </div>
      <div class="bottom">
        <span>{{ post.user.nickname }}</span>
        <span>{{ post.comment_length }}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  },
  methods: {
    fixedUrl(url) {
      if (url.startsWith('http')) {
        return url
      } else {
        return this.$axios.defaults.baseURL + url
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
.single-img-post {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  // 图片失真
  img {
    width: 121px;
    height: 75px;
    display: block;
    // 可以让图片等比例的压缩 取值:cover  contain
    // 类似于 background-size: cover contain
    object-fit: cover;
  }
}

// 多图片样式
.multiple-img-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .imgs {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    img {
      width: 112px;
      height: 74px;
      object-fit: cover;
    }
  }
}

// 视频样式
.video-post {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .video {
    padding: 10px 0;
    position: relative;
    img {
      width: 340px;
      height: 170px;
      object-fit: cover;
      display: block;
    }
    .play {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      line-height: 60px;
      .iconfont {
        font-size: 32px;
        color: #fff;
      }
    }
  }
}
</style>

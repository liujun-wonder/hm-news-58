<template>
  <div class="my-star">
    <hm-header>我的收藏</hm-header>
    <div class="list">
      <hm-post v-for="post in list" :key="post.id" :post="post"></hm-post>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  async created() {
    const res = await this.$axios.get('/user_star')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      data.forEach(aa => {
        aa.comment_length = aa.comments.length
      })
      this.list = data
      console.log(this.list)
    }
  }
}
</script>

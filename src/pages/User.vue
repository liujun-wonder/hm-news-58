<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <div class="info">
      <div class="left">
        <img
          src="https://b-ssl.duitang.com/uploads/item/201707/14/20170714155241_Kevrc.jpeg"
          alt=""
        />
      </div>
      <div class="center">
        <div class="name">
          <span class="iconfont iconxingbienan"></span>
          <span>火星网友</span>
        </div>
        <div class="time">2019-10-10</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>

    <hm-navbar title="我的关注" content="关注的用户"></hm-navbar>
    <hm-navbar title="我的跟帖" content="跟帖/回复"></hm-navbar>
    <hm-navbar title="我的收藏" content="文章/视频"></hm-navbar>
    <hm-navbar title="设置"></hm-navbar>
  </div>
</template>

<script>
export default {}
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
    }
    .right {
      width: 30px;
      text-align: right;
    }
  }
}
</style>

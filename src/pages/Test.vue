<template>
  <div class="test">
    <vue-cropper
      ref="cropper"
      img="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2829387590,2128721795&fm=26&gp=0.jpg"
      :outputSize="1"
      outputType="jpeg"
      :autoCrop="true"
      :info="true"
      :autoCropWidth="150"
      :autoCropHeight="150"
    ></vue-cropper>

    <van-button class="crop" type="primary" @click="crop">剪裁</van-button>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  components: {
    VueCropper
  },
  methods: {
    crop() {
      this.$refs.cropper.getCropBlob(data => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.test {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.crop {
  position: absolute;
  bottom: 0;
}
</style>

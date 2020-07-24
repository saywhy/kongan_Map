<template>
    <div class="vm-screen-all">
      <header class="title"><i class="t_img"></i>{{data.name}}</header>

      <img class="border_line_left"
           src="../../assets/images/screen/content-line.png"
           alt="">
      <img class="border_line_mid" v-if="data.aside_id == 0"
           src="../../assets/images/screen/content-line.png"
           alt="">
      <img class="border_line_right"
           src="../../assets/images/screen/content-line.png"
           alt="">

      <div v-if="data.aside_id == 0">
        <vm-screen-main0></vm-screen-main0>
      </div>
      <div v-else-if="data.aside_id == 1">
        <vm-screen-main1></vm-screen-main1>
      </div>
      <div v-else-if="data.aside_id == 2">
        <vm-screen-main2></vm-screen-main2>
      </div>
      <div v-else-if="data.aside_id == 3">
        <vm-screen-main3></vm-screen-main3>
      </div>
      <div v-else-if="data.aside_id == 4">
        <vm-screen-main4></vm-screen-main4>
      </div>
      <div v-else-if="data.aside_id == 5">
        <vm-screen-main5></vm-screen-main5>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import VmScreenMain0 from './vm-screen-main0';
  import VmScreenMain1 from './vm-screen-main1';
  import VmScreenMain2 from './vm-screen-main2';
  import VmScreenMain3 from './vm-screen-main3';
  import VmScreenMain4 from './vm-screen-main4';
  import VmScreenMain5 from './vm-screen-main5';
  export default {
    name: "vm-screen-all",
    props:['data'],
    components: {
      VmScreenMain0,
      VmScreenMain1,
      VmScreenMain2,
      VmScreenMain3,
      VmScreenMain4,
      VmScreenMain5
    },
    methods:{

    }
  }
</script>

<style scoped lang="less">
.vm-screen-all{
  position: relative;
  .title {
    font-size: 16px;
    color: #fff;
    text-align: left;
    height: 40px;
    line-height: 40px;
    font-family: PingFangSC-Regular;
    .t_img {
      width: 44px;
      height: 14px;
      margin-left: 24px;
      margin-right: 10px;
      display: inline-block;
      vertical-align: middle;
      background-image: url("../../assets/images/screen/content-bt.png");
      background-repeat: no-repeat;
      background-size: 44px 14px;
    }
  }
  .border_line_left {
    height: 260px;
    width: 20px;
    position: absolute;
    left: -10px;
    top: 20px;
  }
  .border_line_mid {
    position: absolute;
    height: 260px;
    width: 20px;
    left: 50%;
    margin-left: -10px;
    top: 20px;
  }
  .border_line_right {
    width: 20px;
    height: 260px;
    position: absolute;
    right: -10px;
    top: 20px;
  }
}
</style>

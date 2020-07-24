<template>
    <div class="vm-screen-middle0" v-cloak>
      <div class="risks">
        <div class="item-list" v-for="(item,index) in riskData" :key="index">
          <span class="name">{{item.name}}</span>
          <div class="content">
            <span class="item" v-for="(it,idx) in item.num" :key="idx">{{it}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      name: "vm-screen-middle0",
      props:['topData'],
      data(){
          return {
            topFlag: true,
            timers: null,
            riskData: []
          }
      },
      created(){
        this.$store.dispatch('getScrenMiddle').then((resp) => {
          if(resp)  {
            let data = this.topData.filter(item => {return item.flag});
            this.riskData = data;
          }
        });
      },
      watch:{
        'topData':function (newVal,oldVal) {
          this.riskData = newVal.filter(item => {return item.flag});
        }
      },
      destroyed(){
        clearInterval(this.timers);
      }
    }
</script>

<style scoped lang="less">
.vm-screen-middle0{
  padding: 0 16px 16px;
  .risks{
    height: 84px;
    display: flex;
    .item-list{
      color: #fff;
      /*width: 192px;*/
      text-align: center;
      padding: 20px 0;
      position: relative;
      display: inline-block;
      flex: 1;
      .name{
        height: 28px;
        line-height: 32px;
        margin-right: 12px;
      }
      .content{
        display: inline-block;
        .item{
          margin-top: 2px;
          margin-right: 5px;
          text-align: center;
          width: 32px;
          height: 36px;
          font-size: 24px;
          line-height: 36px;
          background-size: 32px 36px;
          background-repeat: no-repeat;
          display: inline-block;
          font-family: "LcdD";
          /*background-image: url("../../assets/images/screen/risk.png");*/
          background-image: linear-gradient(180deg, rgba(0,70,255,0.36) 0%, rgba(0,70,255,0.00) 45%, rgba(0,70,255,0.36) 100%);
          box-shadow: inset 0 0 4px 0 rgba(255,255,255,0.24);
          border-radius: 5px;
        }
      }
      /*.close{
        position: absolute;
        left: 132px;
        top: 8px;
        width: 20px;
        height: 20px;
        background-image: url("../../assets/images/screen/head-close.png");
        background-repeat: no-repeat;
        background-size: 20px;
        cursor: pointer;
      }*/
    }
  }
}
</style>

<template>
  <div class="vm-screen-main1">
    <div class="vm-progress-list">
      <div class="item" v-for="(item,index) in progress_list" :key="item.Key">
        <div class="pgress-item">
          <span class="flag-icon" :class="calculate(item.alias)"></span>
        </div>
        <div class="pgress-title">
          <marquee v-if="item.Name.length>2" class="country_name" direction="left"
                   behavior="scroll" scrollamount="1"
                   scrolldelay="0" loop="-1" width="50">
            {{item.Name}}
          </marquee>
          <span class="country_name" v-else>{{item.Name}}</span>
          <span class="country_count">{{item.Val}}</span>
        </div>
        <el-progress :show-text="false" :text-inside="true"
                     :stroke-width="20" :percentage="item.count">
        </el-progress>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  export default {
    name: "vm-screen-main1",
    data(){
      return{
        timers:null,
        progress_list:[/*{Key:"US",Name:"美国", Val: 18918}*/]
      }
    },
    computed:{
      ...mapGetters(['data1'])
    },
    created() {
      this.$store.dispatch('getScrenData1').then((resp) => {
        if(resp)  {this.getData();}
      });
    },
    watch:{
      'data1':function (newVal,oldVal) {
        this.getData();
      }
    },
    destroyed(){
      clearInterval(this.timers);
    },
    methods:{
      //获取数据
      getData() {
        let allNum = 0;

        let data = this.data1;

        data.map(item => {
          allNum += Number(item.Val);
        });

        data.map(item => {

          let alias = item.Key.toLowerCase();

          item.count = (((Number(item.Val)/allNum)) * 100).toFixed(0);

          item.count = Number(item.count);

          Object.assign(item,{alias:alias});
        });

        this.progress_list = data;
      },

      //获取国旗类名
      calculate(alias) {
        return "flag-icon-"+alias;
      }
    }
  }
</script>

<style scoped lang="less">
  .vm-screen-main1{
    padding: 0 16px 10px 16px;
    .vm-progress-list{
      height: auto;
      margin-right: 6px;
      .item{
        display: flex;
        line-height: 50px;
        .pgress-item{
          width: 40px;
          .progress-img{
            vertical-align: middle;
            width: 32px;
          }
        }
        .pgress-title{
          width: 110px;
          text-align: left;
          cursor: default;
          font-family: PingFang;
          border: 1px;
          color: #fff;
          position: relative;
          .country_name{
            width: 40px;
            float: left;
            margin-right: 10px;
            text-align: left;
            font-size: 14px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          .country_count{
            display: inline-block;
            font-size: 14px;
            width: 32px;
            float: left;
          }
        }
        /deep/
        .el-progress{
          flex: 1;
          margin: 12px 0;
          .el-progress-bar{
            .el-progress-bar__outer{
              border-radius: 9px;
              background: rgba(0,215,233,0.12);
              .el-progress-bar__inner{
                border-radius: 9px;
                opacity: 1;
                background: #0A6AD3;
               /* background: linear-gradient(270deg, #00D7E9 0%, #007AFF 100%);*/
                /* background-image: linear-gradient(270deg, #00D7E9 0%, #007AFF 100%);*/
              }
            }
          }
        }
      }
    }
  }
</style>

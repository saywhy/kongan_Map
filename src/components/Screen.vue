<template>
  <div class="home-screen" v-cloak>
    <div class="home-top">
      <div class="home_l">
        <div class="home_block">
          <el-select class="e_select" @change="selectChanged" v-model="selectVal" clearable :popper-append-to-body="false" placeholder="请选择">
            <el-option v-for="item in selectList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <i class="e_select_img"></i>
        </div>

      </div>
      <div class="home_c">{{threatEyeName}}</div>
      <div class="home_r">
        <!--<el-button type="primary" class="e_btn e_btn_quit"
                   icon="el-icon-switch-button" @click="quitScreen();">退出</el-button>-->
        <el-button type="primary" class="e_btn" @click="fullScreen();">
          <span v-if="!isFull"><i class="full"></i><span class="name">全屏</span></span>
          <span v-if="isFull"><i class="refull"></i><span class="name">退出全屏</span></span>
        </el-button>
      </div>
    </div>
    <div class="home-content">
      <div class="screen-1">
        <div class="list-item">
          <vm-screen-all :data="lists[0]"></vm-screen-all>
        </div>
        <div class="list-item">
          <vm-screen-all :data="lists[2]"></vm-screen-all>
        </div>
        <div class="list-item">
          <vm-screen-all :data="lists[4]"></vm-screen-all>
        </div>
      </div>
      <div class="screen-2">
        <div class="list-item list-item-top">
          <vm-screen-middle0 :topData="topLists">
          </vm-screen-middle0>
        </div>
        <div class="list-item list-item-middle">
          <vm-screen-middle1></vm-screen-middle1>
        </div>
         <div class="list-item list-item-bottom">
           <header class="title-flow">
             <span class="t1">实时情报更新</span>
             <span class="t2">信息扩展和关联</span>
           </header>
           <vm-screen-middle2></vm-screen-middle2>
         </div>
      </div>
      <div class="screen-3">
        <div class="list-item">
          <vm-screen-all :data="lists[1]"></vm-screen-all>
        </div>
        <div class="list-item">
          <vm-screen-all :data="lists[3]"></vm-screen-all>
        </div>
        <div class="list-item">
          <vm-screen-all :data="lists[5]"></vm-screen-all>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  import VmScreenAll from './vm-screen/vm-screen-all';
  import VmScreenMiddle0 from './vm-screen/vm-screen-middle0';
  import VmScreenMiddle1 from './vm-screen/vm-screen-middle1';
  import VmScreenMiddle2 from './vm-screen/vm-screen-middle2';
  import { mapGetters } from 'vuex'

  export default {
    name: "home-screen",
    components: {
      VmScreenAll,
      VmScreenMiddle0,
      VmScreenMiddle1,
      VmScreenMiddle2
    },
    data() {
      return {
        isFull:false,
        threatEyeName: '鉴源威胁情报系统',
        selectFlag:false,
        selectVal:0,
        selectList:[{label:'全行业威胁感知',value:0,key:'all'},{label:'石油石化',value:1,key:'oil'},
          {label:'电力行业',value:2,key:'power'},{label:'轨交行业',value:3,key:'rail'},
          {label:'水务行业',value:4,key:'water'},{label:'制造业',value:5,key:'industry'}]
      }
    },
    computed:{
      ...mapGetters({
        baseInfo:'baseInfo',
        lists:'asideLists',
        topLists:'topLists'
      }),
    },
    created() {
      //大屏基础信息
      //this.$store.dispatch('getScreenBase');

      //大屏顶部
     // this.$store.dispatch('getScreenTop');

    },
    mounted() {
      this.escFullScreen();
    },
    methods: {
      //全屏事件
      fullScreen() {
        let el = document.documentElement;
        if (this.isFull) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (el.requestFullscreen) {
            el.requestFullscreen();
          } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
          } else if (el.webkitRequestFullScreen) {
            el.webkitRequestFullScreen();
          } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
          }
        }
      },
      //ESC键
      escFullScreen() {
        let isFullscreen =
          document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.fullScreen ||
          document.mozFullScreen ||
          document.webkitIsFullScreen;
        isFullscreen = !!isFullscreen;
        let that = this;
        document.addEventListener("fullscreenchange", () => {
          that.isFull = !that.isFull;
        });
        document.addEventListener("mozfullscreenchange", () => {
          that.isFull = !that.isFull;
        });
        document.addEventListener("webkitfullscreenchange", () => {
          that.isFull = !that.isFull;
        });
        document.addEventListener("msfullscreenchange", () => {
          that.isFull = !that.isFull;
        });
      },
      /**********************************************/
      selectChanged(val){
        this.$store.commit('SET_SELECT_BY_ID',val);

        this.$store.dispatch('getScrenData0_0');
        this.$store.dispatch('getScrenData0_1');
        this.$store.dispatch('getScrenData1');

        this.$store.dispatch('getScrenData4');

        this.$store.dispatch('getScrenData5');

        this.$store.dispatch('getScrenMidBottom');
      }
    }
  }
</script>

<style scoped lang="less">
  .home-screen {
    padding: 0 36px;
    /* background-color: #001034;*/
    background-color: rgba(0,16,52,.9);
    background-image: url("../assets/images/screen/bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    overflow-y: auto;
    height: 100vh;
    &.active{
      padding: 0 24px;
    }
    &::-webkit-scrollbar {
      //width: 0;
    }
    .home-top {
      height: 100px;
      display: flex;
      .home_l {
        .home_block{
          z-index: 999;
          position: relative;
          /deep/
          .e_select{
            .el-input{
              width: 162px;
              height: 42px;
              .el-input__inner{
                border-width: 0;
                line-height: inherit;
                background-color: transparent;
                font-family: PingFangSC-Regular;
                cursor: pointer;
                color: #fff;
                border-radius: 5px;
                margin-top: 24px;
                font-size: 14px;
                text-align: center;
                background-image: radial-gradient(49% 87%, rgba(10,113,255,0.42) 5%,
                rgba(10,113,255,0.12) 88%, rgba(10,113,255,0.12) 88%);
                &::-webkit-input-placeholder { /* WebKit browsers */
                  font-size: 14px;
                }
                &::-moz-placeholder { /* Mozilla Firefox 19+ */
                  font-size: 14px;
                }
                &:-ms-input-placeholder { /* Internet Explorer 10+ */
                  font-size: 14px;
                }
              }
              .el-input__suffix{
                display: none!important;
              }
            }
            .el-select-dropdown{
              margin-top: 24px!important;
              border-width: 0!important;
              left: 0!important;
              background: #082754!important;
              border-radius: 0 0 5px 5px!important;
              .el-select-dropdown__list{
                padding: 1px 0!important;
                .el-select-dropdown__item{
                  height: 38px;
                  background: #082754;
                  line-height: 38px;
                  font-size: 14px;
                  color: #fff;
                  font-family: PingFangSC-Regular;
                  /*border: 1px solid #082754;*/
                  text-align: center;
                  padding: 0 10px;
                  &:hover{
                    background: #3882FF;
                    /*border: 1px solid #3882FF;*/
                  }
                }
              }
              .popper__arrow{
                display: none!important;
              }
            }
          }
          .e_select_img{
            position: absolute;
            right: 16px;
            top: 38px;
            width: 12px;
            height: 12px;
            background-image: url("../assets/images/screen/head-down.png");
            background-repeat: no-repeat;
            background-size: 12px 12px;
          }
        }
      }
      .home_c {
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #fff;
        line-height: 110px;
        width: 1520px;
        background-image: url("../assets/images/screen/head-center.png");
        background-repeat: no-repeat;
        background-position: 0 40px;
        background-size: 1520px 46px;
      }
      .home_r {
        flex: 1;
        text-align: end;
        font-size: 0;
        /deep/
        .e_btn {
          width: 120px;
          height: 42px;
          border-width: 0;
          line-height: inherit;
          padding: 0;
          outline: none;
          background-color: transparent;
          background-repeat: no-repeat;
          font-family: PingFangSC-Regular;
          cursor: pointer;
          border-radius: 5px;
          margin-top: 24px;
          background-image: radial-gradient(49% 87%, rgba(10,113,255,0.42) 5%, rgba(10,113,255,0.12) 88%, rgba(10,113,255,0.12) 88%);
          & + .el-button {
            margin-left: 0;
          }
          &.e_btn_full {

          }
          .name{
            color: #fff;
            font-size: 16px;
            margin-left: 5px;
          }
          .full{
            height: 20px;
            width: 20px;
            display: inline-block;
            background-image: url("../assets/images/screen/head-full.png");
            background-repeat: no-repeat;
            background-size: 20px 20px;
            vertical-align: bottom;
          }
          .refull{
            height: 20px;
            width: 20px;
            display: inline-block;
            background-image: url("../assets/images/screen/head-re-full.png");
            background-repeat: no-repeat;
            background-size: 20px 20px;
            vertical-align: bottom;
          }

        }
      }
    }
    .home-content {
      display: flex;
      .list-item {
        width: 500px;
        height: 300px;
        margin-bottom: 20px;
        background-image: url("../assets/images/screen/content-lc.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 5px;
      }
      .screen-1 {
        flex: 1;
        .list-item {
          float: left;
        }
      }
      .screen-2 {
        .list-item-top {
          width: 800px;
          height: 85px;
          margin-bottom: 0;
          background:none!important;
        }
        .list-item-middle {
          width: 800px;
          height: 534px;
          margin-bottom: 20px;
          background:none!important;
          /*width: 800px;
          height: 534px;
          margin-bottom: 15px;
          background-image: url("../assets/images/screen/content-mid.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;*/
        }
        .list-item-bottom {
          width: 800px;
          height: 300px;
          .title-flow{
            position: relative;
            font-size: 16px;
            color: #FFFFFF;
            height: 42px;
            line-height: 42px;
            font-family: PingFangSC-Regular;
            /*opacity: 0.72;*/
            background-image: radial-gradient(49% 86%, rgba(10,113,255,0.72) 0%, rgba(10,113,255,0.12) 86%);
            border-radius: 5px 5px 0 0;
            .t1{
              position: absolute;
              left: 220px;
            }
            .t2{
              position: absolute;
              right: 110px;
            }
          }
        }

      }
      .screen-3 {
        flex: 1;
        .list-item {
          float: right;
        }
      }
    }
  }
</style>

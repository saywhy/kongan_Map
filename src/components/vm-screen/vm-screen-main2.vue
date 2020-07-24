<template>
  <div class="vm-screen-main2" v-cloak>
    <div class="attention" v-if="info.length">
      <div class="item" v-if="info.length > $index"
           v-for="(item,$index) in info" :key="$index">

        <marquee v-if="item.name.length > 5" class="name" direction="left"
                 behavior="scroll" scrollamount="1"
                 scrolldelay="0" loop="-1" width="50">
          {{item.name}}
        </marquee>
        <div class="name" v-else>{{item.name}}</div>

        <div id="attent1" v-if="$index == 0"></div>
        <div id="attent2" v-else-if="$index == 1"></div>
        <div id="attent3" v-else-if="$index == 2"></div>
        <div id="attent4" v-else-if="$index == 3"></div>
        <div id="attent5" v-else-if="$index == 4"></div>


        <marquee v-if="item.len.length > 7" class="num" direction="left"
                 behavior="scroll" scrollamount="1"
                 scrolldelay="0" loop="-1" width="50">
          {{item.count}}
        </marquee>
        <div class="num" v-else>{{item.count}}</div>
      </div>
    <!--  <div class="item" v-if="info.length > 0">
        <marquee v-if="info[0].name.length > 5" class="name" direction="left"
                 behavior="scroll" scrollamount="1"
                 scrolldelay="0" loop="-1" width="50">
          {{info[0].name}}
        </marquee>
        <div class="name" v-else>{{info[0].name}}</div>
        &lt;!&ndash;<Marquees class="name" :claName="name" :val="info[0].name"></Marquees>&ndash;&gt;
        <div id="attent1"></div>
        <marquee v-if="info[0].len.length > 7" class="num" direction="left"
                 behavior="scroll" scrollamount="1"
                 scrolldelay="0" loop="-1" width="50">
          {{info[0].count}}
        </marquee>
        <div class="num" v-else>{{info[0].count}}</div>
      </div>

      <div class="item" v-if="info.length > 1">
        <marquee v-if="info[1].name.length > 5" class="name" direction="left"
                 behavior="scroll" scrollamount="1"
                 scrolldelay="0" loop="-1" width="50">
          {{info[1].name}}
        </marquee>
        <div class="name" v-else>{{info[1].name}}</div>
        <div id="attent2"></div>
        <marquee v-if="info[1].len.length > 7" class="num" direction="left"
                 behavior="scroll" scrollamount="1"
                 scrolldelay="0" loop="-1" width="50">
          {{info[1].count}}
        </marquee>
        <div class="num" v-else>{{info[1].count}}</div>
      </div>

      <div class="item" v-if="info.length > 2">
        <marquee v-if="info[2].name.length > 5" class="name" direction="left"
                 behavior="scroll" scrollamount="1"
                 scrolldelay="0" loop="-1" width="50">
          {{info[2].name}}
        </marquee>
        <div class="name" v-else>{{info[2].name}}</div>
        <div id="attent3"></div>
        <marquee v-if="info[2].len.length > 7" class="num" direction="left"
                 behavior="scroll" scrollamount="1"
                 scrolldelay="0" loop="-1" width="50">
          {{info[2].count}}
        </marquee>
        <div class="num" v-else>{{info[2].count}}</div>
      </div>

      <div class="item" v-if="info.length > 3">
        <marquee v-if="info[3].name.length > 5" class="name" direction="left"
                 behavior="scroll" scrollamount="1"
                 scrolldelay="0" loop="-1" width="50">
          {{info[3].name}}
        </marquee>
        <div class="name" v-else>{{info[3].name}}</div>
        <div id="attent4"></div>
        <marquee v-if="info[3].len.length > 7" class="num" direction="left"
                 behavior="scroll" scrollamount="1"
                 scrolldelay="0" loop="-1" width="50">
          {{info[3].count}}
        </marquee>
        <div class="num" v-else>{{info[3].count}}</div>
      </div>

      <div class="item" v-if="info.length > 4">
        <marquee v-if="info[4].name.length > 5" class="name" direction="left"
                 behavior="scroll" scrollamount="1"
                 scrolldelay="0" loop="-1" width="50">
          {{info[4].name}}
        </marquee>
        <div class="name" v-else>{{info[4].name}}</div>
        <div id="attent5"></div>
        <marquee v-if="info[4].len.length > 7" class="num" direction="left"
                 behavior="scroll" scrollamount="1"
                 scrolldelay="0" loop="-1" width="50">
          {{info[4].count}}
        </marquee>
        <div class="num" v-else>{{info[4].count}}</div>
      </div>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import Marquees from '../vm-screen-sup/marquee'
  export default {
    name: "vm-screen-main2",
    data(){
      return{
        timers: null,
        info:[],
        tableData: [{
          type: '影响资产数',
          data0: '',
          data1: '',
          data2: ''
        }],
        name:'name'
      }
    },
    components:{Marquees},
    computed:{
      ...mapGetters(['data0_1'])
    },
    watch:{
      'data0_1':function (newVal,oldVal) {
        this.getData();
      }
    },
    destroyed(){
      clearInterval(this.timers);
    },
    methods:{
      //获取数据
      getData(){
        this.info = [];

        let data = this.data0_1;

        if(data.length == 0){
          return false;
        }

       // data = [{Key: "恶意网络C&C", Name: "恶意网络C&C",Val: 36523742}];
        for(var key of data){
          this.info.push({name: key.Key, count: key.Val, len: String(key.Val)});
        }

        if(this.info.length > 5){
          this.info = this.info.splice(0,5);
        }
        this.$nextTick(function() {
          this.drawGraph();
        });
      },
      drawGraph(){

        if(this.info.length > 0){
          let attent1 = this.$echarts.init(document.getElementById('attent1'));
          attent1.showLoading({ text: '正在加载数据...' });
          attent1.clear();
          let option1 = {
            backgroundColor:'rgba(8,21,53,1)',
            legend: {
              show:false
            },
            grid: {
              top:'0',
              left: '0',
              right: '0',
              bottom: '0',
              containLabel: false
            },
            xAxis: {
              show: true,
              type: 'category',
              boundaryGap: false,
              splitLine:{
                show:true,
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
              axisLine: {
                show:true,
                onZero:true,
                lineStyle:{
                  color:'red'
                }
              },
              data: ['1', '2', '3', '4', '5', '6', '7','8','9','10']
            },
            yAxis: {
              show:true,
              min: 0,
              max: 10,
              splitLine:{
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
              axisLine:{
                show:true,
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
            },
            series: [{
              data: [4,2,3,1,5,4,1,6,2,7],
              type: 'line',
              smooth: true,
              itemStyle:{
                opacity:0
              },
              lineStyle:{
                color:'#007AFF',
                width: 1
              },
              areaStyle: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(0,122,255,0.5)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(0,122,255,0.2)" // 100% 处的颜色
                    },
                  ],
                  global: false
                }
              }
            }]
          };
          attent1.setOption(option1);

          attent1.hideLoading();
          window.addEventListener("resize", () => {
            attent1.resize();
          });
        }

        if(this.info.length > 1){
          let attent2 = this.$echarts.init(document.getElementById('attent2'));
          attent2.showLoading({ text: '正在加载数据...' });
          attent2.clear();
          let option2 = {
            backgroundColor:'rgba(8,21,53,1)',
            legend: {
              show:false
            },
            grid: {
              top:'0',
              left: '0',
              right: '0',
              bottom: '0',
              containLabel: false
            },
            xAxis: {
              show: true,
              type: 'category',
              boundaryGap: false,
              splitLine:{
                show:true,
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
              axisLine: {
                show:true,
                onZero:true,
                lineStyle:{
                  color:'red'
                }
              },
              data: ['1', '2', '3', '4', '5', '6', '7','8','9','10']
            },
            yAxis: {
              show:true,
              min: 0,
              max: 10,
              splitLine:{
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
              axisLine:{
                show:true,
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
            },
            series: [{
              data: [5,3,8,5,4,1,6,4,6,2],
              type: 'line',
              smooth: true,
              itemStyle:{
                opacity: 0
              },
              lineStyle:{
                color:'#FF00C9',
                width: 1
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(255,0,201,0.5)'
                  }, {
                    offset: 1, color: 'rgba(255,0,201,0.2)'
                  }],
                  global: false // 缺省为 false
                }
              }
            }]
          };
          attent2.setOption(option2);
          attent2.hideLoading();
          window.addEventListener("resize", () => {
            attent2.resize();
          });
        }

        if(this.info.length > 2){
          let attent3 = this.$echarts.init(document.getElementById('attent3'));
          attent3.showLoading({ text: '正在加载数据...' });
          attent3.clear();
          let option3 = {
            backgroundColor:'rgba(8,21,53,1)',
            legend: {
              show:false
            },
            grid: {
              top:'0',
              left: '0',
              right: '0',
              bottom: '0',
              containLabel: false
            },
            xAxis: {
              show: true,
              type: 'category',
              boundaryGap: false,
              splitLine:{
                show:true,
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
              axisLine: {
                show:true,
                onZero:true,
                lineStyle:{
                  color:'red'
                }
              },
              data: ['1', '2', '3', '4', '5', '6', '7','8','9','10']
            },
            yAxis: {
              show:true,
              min: 0,
              max: 10,
              splitLine:{
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
              axisLine:{
                show:true,
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
            },
            series: [{
              data: [4,6,4,1,6,5,4,1,5,2],
              type: 'line',
              smooth: true,
              itemStyle: {
                opacity: 0
              },
              lineStyle:{
                color:'#F3AB15',
                width: 1
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(243,171,21,0.5)'
                  }, {
                    offset: 1, color: 'rgba(243,171,21,0.2)'
                  }],
                  global: false // 缺省为 false
                }
              }
            }]
          };
          attent3.setOption(option3);
          attent3.hideLoading();
          window.addEventListener("resize", () => {
            attent3.resize();
          });
        }

        if(this.info.length > 3){
          let attent4 = this.$echarts.init(document.getElementById('attent4'));
          attent4.showLoading({ text: '正在加载数据...' });
          attent4.clear();
          let option4 = {
            backgroundColor:'rgba(8,21,53,1)',
            legend: {
              show:false
            },
            grid: {
              top:'0',
              left: '0',
              right: '0',
              bottom: '0',
              containLabel: false
            },
            xAxis: {
              show: true,
              type: 'category',
              boundaryGap: false,
              splitLine:{
                show:true,
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
              axisLine: {
                show:true,
                onZero:true,
                lineStyle:{
                  color:'red'
                }
              },
              data: ['1', '2', '3', '4', '5', '6', '7','8','9','10']
            },
            yAxis: {
              show:true,
              min: 0,
              max: 10,
              splitLine:{
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
              axisLine:{
                show:true,
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
            },
            series: [{
              data: [1,2,3,1,2,4,5,1,5,2],
              type: 'line',
              smooth: true,
              itemStyle: {
                opacity: 0
              },
              lineStyle:{
                color:'#007AFF',
                width: 1
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [ {
                    offset: 0,
                    color: "rgba(0,122,255,0.5)" // 0% 处的颜色
                  },
                    {
                      offset: 1,
                      color: "rgba(0,122,255,0.2)" // 100% 处的颜色
                    }],
                  global: false // 缺省为 false
                }
              }
            }]
          };
          attent4.setOption(option4);
          attent4.hideLoading();
          window.addEventListener("resize", () => {
            attent4.resize();
          });
        }

        if(this.info.length > 4){
          let attent5 = this.$echarts.init(document.getElementById('attent5'));
          attent5.showLoading({ text: '正在加载数据...' });
          attent5.clear();
          let option5 = {
            backgroundColor:'rgba(8,21,53,1)',
            legend: {
              show:false
            },
            grid: {
              top:'0',
              left: '0',
              right: '0',
              bottom: '0',
              containLabel: false
            },
            xAxis: {
              show: true,
              type: 'category',
              boundaryGap: false,
              splitLine:{
                show:true,
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
              axisLine: {
                show:true,
                onZero:true,
                lineStyle:{
                  color:'red'
                }
              },
              data: ['1', '2', '3', '4', '5', '6', '7','8','9','10']
            },
            yAxis: {
              show:true,
              min: 0,
              max: 10,
              splitLine:{
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
              axisLine:{
                show:true,
                lineStyle:{
                  color:'rgba(44,53,80,.5)'
                }
              },
            },
            series: [{
              data: [3,5,4,2,2,2,2,7,1,5],
              type: 'line',
              smooth: true,
              itemStyle: {
                opacity: 0
              },
              lineStyle:{
                color:'#FF00C9',
                width: 1
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(255,0,201,0.5)'
                  }, {
                    offset: 1, color: 'rgba(255,0,201,0.2)'
                  }],
                  global: false // 缺省为 false
                }
              }
            }]
          };
          attent5.setOption(option5);
          attent5.hideLoading();
          window.addEventListener("resize", () => {
            attent5.resize();
          });
        }

      }
    }
  }
</script>

<style scoped lang="less">
  .vm-screen-main2{
    padding: 14px 10px 10px 10px;
    .attention{
      .item{
        display: flex;
        width: 100%;
        height: 38px;
        line-height: 38px;
        margin-bottom: 8px;
        .name{
          /*flex: 1;*/
          color: #fff;
          width: 100px;
          text-align: right;
          font-size: 14px;
          margin-right: 10px;
        }
        #attent1{
          /*width: 300px;*/
          flex: 1;
        }
        #attent2{
          /*width: 300px;*/
          flex: 1;
        }
        #attent3{
          /*width: 300px;*/
          flex: 1;
        }
        #attent4{
          /*width: 300px;*/
          flex: 1;
        }
        #attent5{
          /*width: 300px;*/
          flex: 1;
        }
        .num{
          width: 84px;
          color: #fff;
          text-align: left;
          margin-left: 10px;
        }
      }
    }
    /deep/
    .screen-table{
      background-color: transparent!important;
      &:before{
        height: 0;
      }
      .el-table__header{
        th{
          /*background: rgba(0,215,233,0.24);*/
          border-width: 0;
          padding: 0;
          height: 28px;
          line-height: 28px;
          background: #034061;
          .cell{
            color: #fff;
          }
        }
      }
      .el-table__body-wrapper{
        overflow-x: hidden;
        .el-table__body{
          td{
            border-width: 0;
            padding: 0;
            height: 32px;
            line-height: 32px;
            background: #00134A;
            .cell{
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>

<template>
  <div class="vm-screen-main4">
    <div id="trend"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  export default {
    name: "vm-screen-main4",
    data(){
      return{
        timers:null,
        trendData: {
          xAxisData:[],
          yAxisData:[]
        }
      }
    },
    computed:{
      ...mapGetters(['data4'])
    },
    created() {
      this.$store.dispatch('getScrenData4').then((resp) => {
        if(resp)  {this.getData();}
      });
    },
    watch:{
      'data4':function (newVal,oldVal) {
        this.getData();
      }
    },
    destroyed(){
      clearInterval(this.timers);
    },
    methods:{
      //获取数据
      getData() {

        let data = this.data4;

        /*let data = [{Key:'2020-07-22',Val:3836084,Name:'2020-07-22'},
          {Key:'2020-07-21',Val:3236084,Name:'2020-07-21'},
          {Key:'2020-07-20',Val:3336084,Name:'2020-07-20'}]*/

        /*this.trendData.xAxisData = Object.keys(data);
        this.trendData.yAxisData = Object.values(data);*/

        this.trendData.xAxisData = data.map(item => {return item.Key});
        this.trendData.yAxisData = data.map(item => {return item.Val});

        this.$nextTick(() => {
          this.drawGraph();
        })
      },
      //地图tooptip样式
      tipFormatter(prams){
        var name = prams.data.name;
        var divWarp = $('<div class="div-tip-warp"/>') ;
        var divContent = $('<div class = "tip-background">');
        var span = $('<span>').text(name);
        var divTriangle = $('<div class ="triangle-down hotel-triangle-position">');
        var divFirst =divContent.append(span);
        var div = divWarp.append(divFirst).append(divTriangle);
        return div.html();
      },

      drawGraph(){
        let myChart = this.$echarts.init(document.getElementById('trend'));
        myChart.showLoading({ text: '正在加载数据...' });
        myChart.clear();

        let option = {
          tooltip: {
            trigger: 'axis',
            backgroundColor:'rgba(0,122,255,0.5)',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            show: false
          },
          grid: {
            top:'5%',
            left: '0',
            right: '12%',
            bottom: '0',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel:{
              color:'#ffffff'
            },
            axisLine:{
              lineStyle:{
                color:'#00D7E9'
              }
            },
            axisTick:{
              show: false
            },
            splitLine:{
              show: true,
              lineStyle:{
                color:'rgba(0,215,233,.12)'
              }
            },
            data: this.trendData.xAxisData
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: '#ffffff',
              fontSize:14,
            },
            axisLine:{
              lineStyle:{
                color:'#00D7E9'
              }
            },
            axisTick:{
              show: false
            },
            splitLine:{
              lineStyle:{
                color:'rgba(0,215,233,.12)'
              }
            }
          },
          series: [{
            type: 'line',
            smooth:true,
            itemStyle:{
              opacity: 0,
              color:'#C3112B',
              borderColor: '#C3112B'
            },
            lineStyle:{
              color:'#C3112B',
              width: 1
            },
            areaStyle: {
              color:{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(195,17,43,0.3)'
                }, {
                  offset: 1, color: 'rgba(195,17,43,0.1)'
                }],
                global: false
              }
            },
            emphasis:{
              show:false
            },
            data: this.trendData.yAxisData
          }]
        };

        myChart.setOption(option);

        myChart.hideLoading();

        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .vm-screen-main4{
    padding: 10px 16px 10px 16px;
    #trend{
      height: 230px;
      width: 100%;
    }
  }
</style>

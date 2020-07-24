<template>
  <div class="vm-screen-main3">
    <div id="branch"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "vm-screen-main3",
    data(){
      return{
        myEcharts:null,
        ranch:[],
        branch:{
          branchName:[],
          branchCount:[],
          highLists:[],
          mediumLists:[],
          lowLists:[]
        },
        timers:null
      }
    },
    created(){
      this.getData();
    },
    mounted() {
      /*this.timers = setInterval(()=>{
        this.getData();
      },10000 * 30);*/
    },
    destroyed(){
      clearInterval(this.timers);
    },
    methods: {
      //获取数据
      getData(){
        this.$axios.get('/trade').then((resp) => {

            let {code, data} = resp.data;

            this.branch = {
                branchName:[],
                branchCount:[],
                highLists:[],
                mediumLists:[],
                lowLists:[]
            };

            if(code == 200){

              //data = data.reverse();

              this.ranch = [];
              let reaAttr = [];

              //console.log(data)
              for(let key in data){

                let dk = data[key];
                let num = 0;
                let attr = Object.values(dk);
                num = this.sum(attr);

                let med = dk.med;
                med += dk.high;

                if(key != ''){
                  reaAttr.push({name:key,high:dk.high,med:med,low:num,sum:num});
                }
                //修改数字
                let id = 0;
                if(key == '石油石化') id = 1;
                else if(key == '电力行业') id = 2;
                else if(key == '轨交行业') id = 3;
                else if(key == '水务行业') id = 4;
                else if(key == '制造业') id = 5;

                if(key != ''){
                  this.$store.commit('SET_TOP_LISTS_NUM',{id:id,count:num});
                }else {
                  continue;
                }
              }

              this.ranch = reaAttr.sort(this.compare("sum"));

              this.branch.branchName = this.ranch.map(item => {return item.name});
              this.branch.branchCount = this.ranch.map(item => {return item.sum});

              this.branch.highLists = this.ranch.map(item => {return item.high});
              this.branch.mediumLists = this.ranch.map(item => {return item.med});
              this.branch.lowLists = this.ranch.map(item => {return item.low});

              this.$nextTick(() => {
                this.drawGraph();
              })
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },

      drawGraph(){

        this.myEcharts = this.$echarts.init(document.getElementById('branch'))
        this.myEcharts.showLoading({ text: '正在加载数据...' });
        this.myEcharts.clear();

        let option = {
          color: ['#60C160','#D0A13F','#D44361'],
          legend: {
            show:false
          },
          grid: {
            top:'0',
            left: '-12%',
            right: '0',
            bottom: '-8%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            show: false
          },
          yAxis: [
            {
              type: 'category',
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                color:'#fff',
                fontSize:14,
               // fontFamily:'PingFangSC-Regular',
                margin: 20
              },
              position:'left',
              data: this.branch.branchCount,
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.9)'
              }
            },
            {
              type: 'category',
              axisLine:{
                show: false
              },
              axisTick:{
                show: false
              },
              axisLabel:{
                color:'#fff',
                fontSize:14,
                //fontFamily:'PingFangSC-Regular',
                margin: 80,
                formatter: function (value) {
                  let valAttr = value.split('');
                  let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");

                  if(reg.test(value)){
                    return (value.length > 5 ? (value.slice(0,5)+"...") : value )
                  }else {
                    return (value.length > 8 ? (value.slice(0,8)+"...") : value )
                  }
                },
              },
              position:'left',
              data: this.branch.branchName,
              triggerEvent: true
            }
          ],
          series: [
            {
              name: '低危',
              type: 'bar',
              /*stack: '威胁排名',*/
              barWidth: '24%',
              barGap: '-100%',
              itemStyle: {
                normal: {
                  show: true,
                  barBorderRadius: 50,
                  borderWidth: 0
                }
              },
              data: this.branch.lowLists
            },
            {
              name: '中危',
              type: 'bar',
              /*stack: '威胁排名',*/
              barWidth: '24%',
              barGap: '-100%',
              itemStyle: {
                normal: {
                  show: true,
                  barBorderRadius: 50,
                  borderWidth: 0
                }
              },
              data: this.branch.mediumLists
            },
            {
              name: '高危',
              type: 'bar',
              /*stack: '威胁排名',*/
              barWidth: '24%',
              barGap: '-100%',
              data: this.branch.highLists,
              itemStyle: {
                normal: {
                  show: true,
                  barBorderRadius: 50,
                  borderWidth: 0
                }
              },
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(255,255,255,.16)',
                barBorderRadius: 50,
                borderWidth: 0
              },
            },
          ]
        };
        this.myEcharts.setOption(option);
        this.myEcharts.hideLoading();

        window.addEventListener("resize", () => {
          this.myEcharts.resize();
        });

        var id = document.getElementById("extension");
        /*if(!id) {
          var div = "<marquee id='extension' behavior='scroll' direction='left' sytle='display:block'></marquee>";
          $("html").append(div);
        }*/
        if(!id) {
          var div = "<span id='extension' sytle='display:block'></span>";
          $("html").append(div);
        }

        this.myEcharts.on('mouseover', function(params) {
          //注意这里，我是以Y轴显示内容过长为例，如果是x轴的话，需要改为xAxis
          if(params.componentType == "yAxis") {
            //设置悬浮文本的位置以及样式
            $('#extension').css({
              "position": "absolute",
              "color": "#fff",
              "background":"rgba(0,0,0,.5)",
              "font-family": "PingFangSC-Regular",
              "font-size": "12px",
              "padding": "5px",
              "display": "inline"
            }).text(params.value);
            $("html").mousemove(function(event) {
              var xx = event.pageX - 10;
              var yy = event.pageY + 15;
              $('#extension').css('top', yy).css('left', xx);
            });
          }
        });

        this.myEcharts.on('mouseout', function(params) {
          //注意这里，我是以Y轴显示内容过长为例，如果是x轴的话，需要改为xAxis
          if(params.componentType == "yAxis") {
            $('#extension').css('display', 'none');
          }
        });

        this.myEcharts.on("mouseover", params => {
          this.myEcharts.dispatchAction({
            type: 'downplay'
          });
        });
      },

      sum(arr) {
        return arr.reduce(function(prev, curr, idx, arr){
          return prev + curr;
        });
      },
      compare(prop){
        return function(a,b){
          var value1 = a[prop];
          var value2 = b[prop];
          return value1 - value2;
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .vm-screen-main3{
    padding: 0 16px 10px 16px;
    margin-right: 10px;
    #branch{
      height: 250px;
      width: 100%;
    }
  }
</style>

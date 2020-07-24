 <template>
    <div class="vm-screen-main0">
      <div class="main0-item">
        <div id="threat-rank"></div>
        <h3 class="name">威胁等级分布</h3>
        <ul class="legend">
          <li class="item" v-for="item in legendDegree">
            <i class="bgs" v-bind:style="{ background: item.color }"></i>
            <span class="title">{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="main0-item">
        <div id="threat-scat"></div>
        <h3 class="name">威胁类型分布</h3>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  require('../../../static/js/echarts-auto-tooltip');
  import { mapGetters } from 'vuex'
  export default {
      name: "vm-screen-main0",
      data() {
          return {
            timers: null,
            degree:[],
            legendDegree:[],
            category:[],
            legendCategory:[]
          }
      },
      computed:{
        ...mapGetters(['data0_0','data0_1'])
      },
      created() {
        this.$store.dispatch('getScrenData0_0').then((resp) => {
          if(resp)  {this.getDegree();}
        });
        this.$store.dispatch('getScrenData0_1').then((resp) => {
          if(resp)  {this.getCateory();}
        });
      },
      watch:{
        'data0_0':function (newVal,oldVal) {
          this.getDegree();
        },
        'data0_1':function (newVal,oldVal) {
          this.getCateory();
        }
      },
      destroyed(){
        clearInterval(this.timers);
      },
      methods:{
        //等级
        getDegree() {

          this.degree = [];
          this.legendDegree = [];

          let data = this.data0_0;
          for(var key of data){
            if(key.Name != ''){
              this.degree.push({degree: key.Key, count: key.Val});
            }
          }
          this.$nextTick(function() {
            this.drawDegree();
          });
        },
        drawDegree() {
          let degAttr = this.degree;
          let colorAttr = [];
          this.legendDegree = [];

          let degrees = [];

          degAttr.forEach(function (v,k) {
            if(v.degree == 'high'){
              v.pid = 0;
            }else if(v.degree == 'med'){
              v.pid = 1;
            }else if(v.degree == 'low'){
              v.pid = 2;
            }
          });

          degrees = degAttr.sort(this.compare("pid"));

          if(degrees){
            degrees.filter(item => {
             let name = '';let value = 0;let color = '';
             if(item.degree == 'high'){
               name = '高危';
               value = item.count;
               color = '#FF5F5C';
             }else if(item.degree == 'med'){
               name = '中危';
               value = item.count;
               color = '#FEAA00';
             }else if(item.degree == 'low'){
               name = '低危';
               value = item.count;
               color = '#12DCFF';
             }
             colorAttr.push(color);
             Object.assign(item,{value,name,itemStyle:{color:color}});

             //设置图例
             this.legendDegree.push({color:color,name:name});
            });
          }else {
            return false;
          }
          // 基于准备好的dom，初始化echarts实例
          this.$echarts.dispose(document.getElementById("threat-rank"));
          let myEcharts = this.$echarts.init(document.getElementById("threat-rank"));
          myEcharts.showLoading({ text: '正在加载数据...' });

          myEcharts.clear();
          // 绘制图表
          let option = {
            grid: {
              top: "20%",
              left: "5%",
              right: "5%",
              bottom: "5%",
              containLabel: true
            },
            legend: {
              show:false,
              bottom: 20,
              left: 5,
              orient: "horizontal",
             /* itemWidth:12,
              itemHeight: 8,*/
             /* align:'center',*/
              textStyle: {
                color: '#fff',
                fontSize: 10
              },
              //data: this.flow.legendData
            },
            color: colorAttr,
            series: [{
                name: "预警",
                type: "pie",
                center: ['50%', '48%'],
                radius: ["45%", "60%"],
                avoidLabelOverlap: false,
                //hoverAnimation: false,
                legendHoverLink: false,
                hoverOffset: 3,
                selectedOffset: 0,
                label: {
                  normal: {
                    show: false,
                    position: "center"
                  }
                },
                emphasis: {
                  label: {
                    show: true,
                    formatter: ["{d|{d}%}", "{b|{b}}"].join("\n"),
                    rich: {
                      d: {
                        fontSize: 20,
                        lineHeight: 40,
                        color: '#fff'
                      },
                      b: {
                        color: "#fff"
                      }
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: degrees
              }
            ]
          };

          myEcharts.setOption(option);
          myEcharts.hideLoading();

          tools.loopShowTooltip(myEcharts, option, {loopSeries: true});

          window.addEventListener("resize", () => {
            myEcharts.resize();
          });
        },
        //类型
        getCateory() {
          this.category = [];
          this.legendCategory = [];

          let data = this.data0_1;

          for(var key of data){
            if(key.Name != ''){
              this.category.push({category: key.Key, count: key.Val});
            }
          }

          this.$nextTick(function() {
            this.drawCategory();
          });
        },
        drawCategory() {
          let categories = this.category;

          this.legendCategory = [];

          //let colorAttr = ["#8DF97F","#9C00E5","#0E79FF","#FF35C1","#BECE2A"];

          if(categories){
            categories.filter((item,index) => {
              var name = item.category;
              var value = item.count;
              Object.assign(item,{value,name});
            });

            //设置图例
            //this.legendCategory.push({color:color,name:name});
          } else {
            return false;
          }

          // 基于准备好的dom，初始化echarts实例

          this.$echarts.dispose(document.getElementById("threat-scat"));

          let myEcharts1 = this.$echarts.init(document.getElementById("threat-scat"));

          myEcharts1.showLoading({ text: '正在加载数据...' });

          myEcharts1.clear();

          // 绘制图表
          var option1 = {
            grid: {
              top: "20%",
              left: "5%",
              right: "5%",
              bottom: "5%",
              containLabel: true
            },
            color: ["#8DF97F", "#9C00E5", "#0E79FF", "#FF35C1", "#BECE2A", '#0E79FF', '#41B3F9', '#962116', '#4AA46E','#AE5BD5'],
            series: [
              {
                name: "威胁类型分布",
                type: "pie",
                center: ['50%', '48%'],
                radius: ["45%", "60%"],
                avoidLabelOverlap: true,
                /*legendHoverLink: false,*/
                hoverOffset: 3,
                selectedOffset: 0,
                label: {
                  normal: {
                    show: false,
                    position: "center"
                  }
                },
                emphasis: {
                  label: {
                    show: true,
                    formatter: ["{d|{d}%}", "{b|{b}}"].join("\n"),
                    rich: {
                      d: {
                        fontSize: 20,
                        lineHeight: 40,
                        color: '#fff'
                      },
                      b: {
                        color: "#fff"
                      }
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: categories
              }
            ]
          };

          myEcharts1.setOption(option1,true);

          myEcharts1.hideLoading();

          tools.loopShowTooltip(myEcharts1, option1, {loopSeries: true});

          window.addEventListener("resize", () => {
            myEcharts1.resize();
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
.vm-screen-main0{
  padding: 0 16px 10px 16px;
  display: flex;
  .main0-item{
    flex: 1;
    position: relative;
    .name {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #fff;
      position: absolute;
      top: 10px;
      width: 100%;
    }
    #threat-rank{
      height: 250px;
      width: 100%;
    }
    #threat-scat{
      height: 250px;
      width: 100%;
    }
    .legend{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 48px;
      .item{
        display: inline-block;
        margin: 2px 6px;
        .bgs{
          width: 6px;
          height: 6px;
          display: inline-block;
          border-radius: 4px;
          margin-right: 4px;
        }
        .title{
          font-size: 12px;
          color: #fff;
        }
      }
    }
  }
}
</style>

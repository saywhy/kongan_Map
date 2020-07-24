<template>
    <div class="vm-screen-middle2">
      <div class="block-all">
        <div class="flow" id="box">
          <ul class="box-list" :class="{anim:animate == true}">
            <li v-for="(item,index) in itemsList" :key="index" class="li-item">
              <button class="item" v-for="(it,idx) in item"
                      :key="idx" :class="{'active':it.type == 'alert'}">{{it.name}}</button>
            </li>
          </ul>
        </div>
        <div class="arrow"></div>
        <div class="real">
          <div id="info_relation"></div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
    export default {
      name: "vm-screen-middle2",
      data(){
          return{
            timers:null,
            scrollers:null,
            timeout:null,

            animate:false,
            itemsList:[],
            items:[
              {name:"MAL:A07DA897FDE02",type:'common'},
              {name:"MAL:A07DA897FDE02",type:'alert'},
              {name:"MAL:A07DA897FDE02",type:'common'}
            ]
          }
      },
      computed:{
        ...mapGetters(['dataBottom']),
      },
      created() {
        this.$store.dispatch('getScrenMidBottom').then((resp) => {
          if(resp)  {this.getData();}
        });
      },
      watch:{
        'dataBottom':function (newVal,oldVal) {
          this.getData();

          clearInterval(this.timers);

          this.timers = setInterval(()=>{
            this.$store.dispatch('getScrenMidBottom').then((resp) => {
              if(resp)  {this.getData();}
            });
          },6000 * 4);
        }
      },
      mounted() {
        this.timers = setInterval(()=>{
          this.getData();
        },6000 * 4);
      },
      destroyed(){
        clearInterval(this.timers);
        clearInterval(this.scrollers);
      },
      methods:{
        //获取数据
        getData() {

          let data = this.dataBottom;

          clearInterval(this.scrollers);

          this.itemsList = [];

          this.itemsList = this.sliceArray(data,3);

          let attr = this.itemsList.slice(0,5);

          this.scrollers = setInterval(this.scroll,5000);

          this.$nextTick(() => {
            this.drawGraph(attr);
          });
        },
        drawGraph(attr) {

          let attrs = [];

          attr.forEach((item) => {
            item.forEach((it) => {
              if(it.type == 'alert'){
                attrs.push(it);
              }
            });
          });

         // console.log(attrs);

          this.$store.commit('SET_HIGHLIGHT_LIST',attrs);

          let datalist = [];
          let linklist = [];

          if(attrs.length > 0){

            attrs.forEach(item => {
              var obj = {};  let linkobj = {};
              obj.name = item.name;
              obj.symbolSize = 10;

              datalist.push(obj);
              linkobj.source = item.name;

              let des = item.des;
              for(let key in des){
                var link={
                  source:linkobj.source,
                  label:{show:false}
                }
                datalist.push({name:des[key],symbolSize: 10});
                link.target = des[key];
                linklist.push(link);
              }
            });
          }

          //去重
          var hash = {};
          datalist = datalist.reduce(function(datalist, current) {
            hash[current.name] ? '' : hash[current.name] = true && datalist.push(current);
            return datalist
          }, []);

          var mychart = this.$echarts.init(document.getElementById("info_relation"));

          var option = {
            tooltip:{
              show: true,
              formatter:function (params) {
                return params.data.name;
              }
            },
            animationDurationUpdate: 1500,
            animationEasingUpdate: "quinticInOut",
            series: [
              {
                type: "graph",
                layout: "force",
                //focusNodeAdjacency: true,
                force: {
                  repulsion: 300,
                  gravity: 0.15,
                  edgeLength: 100
                },
                symbolSize: 10,
                roam: true,
                label: {
                  normal: {
                    show: true, //显示
                    fontSize: 8,
                    position: "right" //相对于节点标签的位置，默认在节点中间
                  }
                },
                edgeSymbol: ["circle","arrow"], //边两端的标记类型
                //edgeSymbolSize: [4, 8],//边两端的标记大小
                edgeSymbolSize: [2, 6],
                edgeLabel: {
                  normal: {
                    show: true,
                    textStyle: {
                      fontSize: 8,
                      color: "#fff"
                    },
                    formatter: "{c}"
                  }
                },
                data: datalist,
                links: linklist,
                itemStyle: {
                  normal: {
                    borderColor: "#DBA500",
                    borderWidth: 0,
                    shadowBlur: 10,
                    /*color: "#DBA500"*/
                  }
                },
                lineStyle: {
                  normal: {
                    opacity: 0.31,
                    width: 1,
                    color: "#fff",
                    curveness: 0.7
                  }
                }
              }
            ]
          };
          mychart.setOption(option, true);
        },
        sliceArray(array, size) {
          var result = [];
          for (var x = 0; x < Math.ceil(array.length / size); x++) {
            var start = x * size;
            var end = start + size;
            result.push(array.slice(start, end));
          }
          return result;
        },
        scroll(){
          this.animate=true;
          clearTimeout(this.timeout);
          this.timeout = setTimeout(()=>{
            this.itemsList.push(this.itemsList[0]);
            this.itemsList.shift();

            let attr = this.itemsList.slice(0,5);
            this.drawGraph(attr);

            this.animate = false;
          },500)
        }
      }
    }
</script>

<style scoped lang="less">
.vm-screen-middle2{
  padding: 0 16px 16px;
  .block-all{
    display: flex;
    .flow{
      height: 230px;
      width: 480px;
      text-align: left;
      margin: 14px 0;
      overflow: hidden;
      .box-list{
        &.anim{
          transition: all 0.5s;
          margin-top: -46px;
        }
        .li-item{
          height: 46px;
          line-height: 46px;
          text-align: left;
          font-size: 0;
          position: relative;
          .item{
            padding: 8px 5px;
            border-radius: 4px;
            color: #fff;
            width: 150px;
            background: #26314d;
            outline: none;
            border: 1px solid #26314d;
            margin: 6px 8px 6px 0;
            cursor: default;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            &.active{
              color: #C3112B;
              background: rgba(195,17,43,0.24);
              border: 1px solid #C3112B;
            }
          }
        }
      }
    };
    .arrow{
      width: 40px;
      height: 200px;
      background-image: url("../../assets/images/screen/content-arrow.png");
      background-repeat: no-repeat;
      background-size: 40px 200px;
      margin: 25px 0;
    }
    .real{
      flex: 1;
      height: 245px;
      #info_relation{
        width: 100%;
        height: 220px;
      }
    }
  }
}

@keyframes moveHover {
  0% {
    height: 4px;
   /* background: rgba(0,215,233,0.06);*/
  }
  50% {
    height: 100%;
   /* background: rgba(0,122,255,0.48);*/
  }
  100% {
    height: 4px;
   /* background: rgba(0,215,233,0.06);*/
  }
}
</style>

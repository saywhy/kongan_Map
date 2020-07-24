<template>
  <div class="vm-screen-main5">
    <el-table :data="tableData" class="screen-table">
      <el-table-column prop="IOC" label="IOC" show-overflow-tooltip></el-table-column>
      <el-table-column prop="category" label="类型" show-overflow-tooltip></el-table-column>
      <el-table-column prop="country" label="国家" show-overflow-tooltip></el-table-column>
   <!--<el-table-column label="攻击阶段" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.attack_stage | stage }}
        </template>
      </el-table-column>-->
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'

  export default {
    name: "vm-screen-main5",
    data() {
      return {
        timers:null,
        tableData: []
      }
    },
    computed:{
      ...mapGetters(['data5']),
    },
    created() {
      this.$store.dispatch('getScrenData5').then((resp) => {
        if(resp)  {this.getData();}
      });
    },
    watch:{
      'data5':function (newVal,oldVal) {
        this.getData();

        clearInterval(this.timers);

        this.timers = setInterval(()=>{
          this.$store.dispatch('getScrenData5').then((resp) => {
            if(resp)  {this.getData();}
          });
        },10000);
      }
    },
    mounted() {
      this.timers = setInterval(()=>{
        this.$store.dispatch('getScrenData5').then((resp) => {
          if(resp)  {this.getData();}
        });
      },10000);
    },
    destroyed(){
      clearInterval(this.timers);
    },
    methods: {
      //获取数据
      getData() {
        this.tableData = [];
        let data = this.data5;
        for (var value of data) {
          for (var val in value) {
            let vk = value[val];
            this.tableData.push({IOC:val,category:vk.category[0],country:vk.country});
          }
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .vm-screen-main5 {
    padding: 0 24px 10px 24px;

    /deep/
    .screen-table {
      background-color: transparent!important;
      &:before {
        height: 0;
      }
      .el-table__body-wrapper{
        overflow-x: inherit;
      }
      .el-table__header {
        th {
          padding: 0;
          height: 40px;
          line-height: 40px;
          background: #081535;
          border-bottom: 1px solid rgba(151,151,151,.36);
          .cell {
            color: #3882FF;
            text-align: center;
          }
        }
      }

      .el-table__body {
        tr{
          td {
            border-width: 0;
            padding: 0;
            height: 40px;
            line-height: 40px;
            background: #081535;
            .cell {
              color: #fff;
            }
          }
          &:nth-child(even){
            td {
              background: #224889;
            }
          }
        }
      }
    }
  }
</style>

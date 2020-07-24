<template>
  <div class="vm-screen-middle1" v-cloak>
    <div id="spreader">
      <vm-screen-map></vm-screen-map>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VmScreenMap from '../vm-screen-sup/vm-screen-map';
  export default {
    name: "vm-screen-middle1",
    data(){
      return{
        tabFlag:false,
        data:[]
      }
    },
    components:{
      VmScreenMap
    },
    methods:{

    }
  }
</script>

<style scoped lang="less">
  .vm-screen-middle1{
    padding: 0;
    position: relative;
    height: 534px;
    #spreader{}
  }
</style>

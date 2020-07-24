<template>
  <div :class="claName">
    <marquee v-if="!flag" class="mar" direction="left"
             behavior="scroll" scrollamount="1"
             scrolldelay="0" loop="-1">
      {{val}}
    </marquee>
    <p class="getWidth" v-else>{{val}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Marquees',
    props: ['val','claName'],
    data () {
      return {
        flag: true
      }
    },
    mounted () {
      setTimeout(() => {
        console.log(this.claName)
        this.move();
      },1000)
    },
    methods: {
      move () {
        let maxWidth = document.querySelector('.'+this.claName).clientWidth;
        let width = document.querySelector('.getWidth').scrollWidth;

        let getWidth = document.querySelector('.getWidth');

        console.log(maxWidth +'---'+ width);

        if (width > maxWidth){
           this.flag = false;
        }else {
          getWidth.style.width = maxWidth + 'px';
          this.flag = true;
        }
      }
    }
  }
</script>

<style scoped>
  .marquee-wrap {
    width: 100%;
    overflow: hidden;
    position: relative;
    border: 1px solid red;
  }
  .getWidth {
    word-break:keep-all;
    white-space:nowrap;
    position: absolute;
    top: 0;
    text-align: right;
  }
</style>

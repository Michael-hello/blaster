<template>
  <div id="main">

    <Container />

  </div>
</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";

import Container from './Container.vue';

@Component({
  components: {
    Container
  }
})
/** 
 * The purpose of this component is to import the blaster app from Container as well as 
 * provide a location for extraneous functionality such as user login
 **/
export default class Main extends Vue {

}

</script>

<style scoped>
#main{
  height: 100%;
  width: 100%;
  background-color: gray;
  position: relative;
  overflow: hidden;
}

</style>

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

<template>
  <div id="main-container">

    <Animation 
      v-if=loaded
      :context="context"
    />

  </div>
</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import Animation from './Animation.vue';
import { BlasterContext } from './framework';


@Component({
  components: {
      Animation
  }
})
export default class Container extends Vue {

  context: BlasterContext = null;
  loaded = false;

  async mounted(){
    this.context = new BlasterContext();
    this.loaded = true;
  }

}

</script>

<style scoped>
#main-container{
  height: 100%;
  width: 100%;

  max-height: 1000px;
  max-width: 562.5px;

  background-color: black;

  /* position: absolute; */
  margin: auto;
}

</style>

<template>
  <div id="main-container">

    <Animation 
      v-if=loaded
      :context="context"
      :options="options"
    />

  </div>
</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import Animation from './Animation.vue';
import { EnemyBuilder, IOptions, MainContext, OptionsService, ShipBuilder } from '../framework';


@Component({
  components: {
      Animation
  }
})
/**
 * The Container component: this is the blaster app root container. 
 * All blaster app initialisation is done here such as creating MainContext
 */
export default class Container extends Vue {

  context: MainContext = null;
  options: IOptions = null;
  loaded = false;

  async created(){
    let optionsService = new OptionsService();
    let shipBuilder = new ShipBuilder(optionsService);
    let enemyBuilder = new EnemyBuilder(optionsService);

    this.context = new MainContext(optionsService, shipBuilder, enemyBuilder);
    this.options = optionsService.getOptions();
    this.loaded = true;

    //TO DO: allow user to edit IOptions
  };

}

</script>

<style scoped>
#main-container{
  height: 100%;
  width: 100%;

  max-height: 1000px;
  max-width: 560px;

  background-color: black;

  /* position: absolute; */
  margin: auto;
}

</style>

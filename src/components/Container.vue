<template>
  <div id="main-container">

    <Animation 
      v-if="loaded && isAlive"
      :context="context"
      :options="options"
    />

    <div v-if="!isAlive" id=game-over>
      <span id=go-text>GAME OVER</span>
      <button @click="newGame" id="newGame">New Game</button>
    </div>

  </div>
</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import Animation from './Animation.vue';
import { BaseContext, EnemyBuilder, IOptions, MainContext, OptionsService, ShipBuilder, ShipLifeChange, ShipLifeChangeEvent, SubscriptionHandler } from '../framework';
import {  filter } from "rxjs/operators";
import { GateBuilder } from "../framework/gates";


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
  handler: SubscriptionHandler = new BaseContext();
  isAlive = true;
  shipLives = 0;

  async created(){
    let optionsService = new OptionsService();
    let shipBuilder = new ShipBuilder(optionsService);
    let enemyBuilder = new EnemyBuilder(optionsService);
    let gateBuilder = new GateBuilder(optionsService);

    this.context = new MainContext(shipBuilder, enemyBuilder, gateBuilder);
    this.options = optionsService.getOptions();
    this.loaded = true;

    let sub1 = this.context.events.pipe(
        filter(x => x.topic == ShipLifeChange)
    ).subscribe((x) => {
      this.shipLives = Number((x as ShipLifeChangeEvent).remainingLives);
      this.isAlive = this.shipLives > 0;
    });

    this.handler.subscriptions.push(sub1);

    //TO DO: allow user to edit IOptions
  };
  
  newGame() {
    if(this.context == null) return;
    this.context.newGame();
  }

  beforeDestroy() {
    if(this.handler) {
      this.handler.dispose();
    };
    if(this.context) {
      this.context.dispose();
    };
  };

}

</script>

<style scoped>
#main-container{
  height: 100%;
  width: 100%;

  max-height: 1000px;
  max-width: 760px;

  background-color: black;

  /* position: absolute; */
  margin: auto;
}

#game-over {
  position: relative;
  display: block;
  width: 250px;
  top: 40%;
  left: 30%;
}

#go-text {
  text-align: center;
  font-weight: 600;
  font-size: 40px;
  color: white;
  user-select: none;
}

</style>

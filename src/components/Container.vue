<template>
  <div id="main-container">

    <Banner 
      v-if="loaded"
      :context="scoreContext"
      :isAlive="isAlive"
      :shipLives="shipLives"
      :initialLives="initialLives"
    />

    <Animation 
      v-if="loaded && isAlive"
      :context="context"
      :options="options"
    />

    <div v-if="!isAlive" id=game-over>
      <span>GAME OVER</span>
      <button @click="newGame" id="newGame">New Game</button>
    </div>

  </div>
</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import Animation from './Animation.vue';
import Banner from "./Banner.vue";
import { BaseContext, EnemyBuilder, IOptions, MainContext, OptionsService, ShipBuilder, ShipLifeChange, ShipLifeChangeEvent, SubscriptionHandler } from '../framework';
import {  filter } from "rxjs/operators";
import { GateBuilder } from "../framework/gates";
import { Subscription } from "rxjs";


@Component({
  components: {
      Animation,
      Banner
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
  subsription: Subscription = null;
  isAlive = true;
  shipLives = 0;

  get initialLives() {
    if(this.options == null) return 0;
    return this.options.shipLives;
  };

  get scoreContext() {
    return this.context == null ? null : this.context.score;
  };

  async created(){
    let optionsService = new OptionsService();
    let shipBuilder = new ShipBuilder(optionsService);
    let enemyBuilder = new EnemyBuilder(optionsService);
    let gateBuilder = new GateBuilder(optionsService);

    this.context = new MainContext(shipBuilder, enemyBuilder, gateBuilder);
    this.options = optionsService.getOptions();
    this.subscribeToEvents();
    this.loaded = true;

    //TO DO: allow user to edit IOptions
  };
  
  newGame() {
    if(this.context == null) return;
    this.context.newGame();
    this.isAlive = true;
    this.subscribeToEvents();
  };

  pauseGame() {
    if(this.context == null) return;
    this.context.pauseGame();
  };

  subscribeToEvents() {

    if(this.subsription) 
      this.subsription.unsubscribe();

    this.subsription = this.context.events.pipe(
        filter(x => x.topic === ShipLifeChange)
    ).subscribe((x) => {
      this.shipLives = Number((x as ShipLifeChangeEvent).remainingLives);
      // this.isAlive = this.shipLives > 0;
      if(this.shipLives <= 0) this.context.pauseGame();
      console.log(this.shipLives)
    });
  };

  beforeDestroy() {
    if(this.subsription) {
      this.subsription.unsubscribe();
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

  display: flex;
  flex-direction: column;

  max-height: 1000px;
  max-width: 760px;

  background-color: black;

  margin: auto;
  overflow: hidden;
}

#game-over {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 250px;
  top: 40%;
  left: calc(50% - 125px);
  text-align: center;
  font-weight: 600;
  font-size: 40px;
  line-height: 40px;
  color: white;
  user-select: none;
}

#newGame {
  width: 160px;
  height: 45px;
  border-radius: 5px;
  font-size: 26px;
  line-height: 26px;
  margin: auto;
};

span { 
  user-select: none;
}

</style>

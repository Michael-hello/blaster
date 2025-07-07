<template>
  <div id="banner-container" v-if="loaded && context != null">

    <div id="score" class="banner-item">
        <p>Score:</p>   
        <p id=score-label>{{ score }}</p>
    </div>

    <div id="lives" class="banner-item">
        <p>Lives:</p>

        <svg 
            xmlns="http://www.w3.org/2000/svg"
            version="1.2"
            :viewBox="viewbox"
            class=svg
        >
            <template v-for="(ship, index) in shipLives">
                <ship-icon 
                    :key=index
                    :width="shipSize" 
                    :height="shipSize" 
                    :x="(index+1) * shipSize" 
                    :y="0" 
                />
            </template>
        </svg>
    </div>

  </div>
</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { ScoreContext } from "../framework";
import ShipIcon from "./elements/ShipIcon.vue";

@Component({
    components: {
        ShipIcon
    }
})
export default class Banner extends Vue {

  @Prop({ required: false}) context: ScoreContext;
  @Prop({ required: true}) isAlive: boolean;
  @Prop({ required: true}) shipLives: number;
  @Prop({ required: true}) initialLives: number;

  loaded = false;
  shipSize = 50;

  get score() {
    return this.context == null ? 0 : this.context.score;
  };

  get viewbox() {
    let h = this.shipSize;
    let w = h * this.initialLives;
    return `${0}, ${0}, ${w}, ${h}`;
  };

  async created() {
    this.loaded = true;
  };
  
}

</script>


<style scoped>

#banner-container{
  height: 80px;
  width: 100%;

  background-color: blue;

  user-select: none;

  display: flex;
  flex-direction: row;
  gap: 20px;
}

.banner-item {
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  border: 1px solid black;
  margin: 10px;

  font-size: 25px;
  font-weight: 600;
  color: white;
}

p {
    margin: 0;
}

#score {
    display: flex;
    flex-direction: row;
}

#lives {
    display: flex;
    flex-direction: row;
}

#score-label {
    margin-left: 30px;
    color: red;
};

.svg{
  height: 100%;
  width: 100%;
  border: 1px solid white;
}

</style>

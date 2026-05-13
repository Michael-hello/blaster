<template>

    <ship-icon 
        :width="size" 
        :height="size" 
        :x=shipX 
        :y=shipY 
        :showIcon=showShip
    />

</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { IOptions, ShipContext } from "../../framework";
import ShipIcon from "./ShipIcon.vue";

@Component({
  components: {
    ShipIcon
  }
})
export default class Ship extends Vue {

    @Prop({ required: true }) context: ShipContext;
    @Prop({ required: true }) options: IOptions;

    loaded = true;
    interval: NodeJS.Timer = null;
    showShip = true;

    get size() { return this.options.shipSize * 3.5 }

    get direction() {
      return this.context.direction;
    };

    /** x and y attributes defines y-position of the top-left corner of the rect 
     * therefore need to correct for ship size */
    get shipX(){ return this.context.x }
    get shipY(){ return this.context.y  }

    mounted(){
      /** used to "flash" the ship when it's immune */
      this.interval = setInterval(() => {
        if(this.context.isImmune && this.context.currentLives > 0) {
          this.showShip = !this.showShip;
        } else {
          this.showShip = true;
        };
      }, 100);
    };

    beforeDestroy(){
      if(this.interval) clearInterval(this.interval);
    };

}

</script>

<style scoped>
#svg-container{
  height: 100%;
  width: 100%;
}

.svg{
  height: 100%;
  width: 100%;
}

</style>

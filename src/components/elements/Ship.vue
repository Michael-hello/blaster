<template>

    <ship-icon 
        :width="size" 
        :height="size" 
        :x=shipX 
        :y=shipY 
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

    get size() { return this.options.shipSize }

    /** x and y attributes defines y-position of the top-left corner of the rect 
     * therefore need to correct for ship size */
    get shipX(){ return this.context.x }
    get shipY(){ return this.context.y  }



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

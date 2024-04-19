<template>

    <rect 
        width="10" 
        height="10" 
        :x=shipX 
        :y=shipY 
        style="fill:rgb(13,56,255); stroke-width:3; stroke:rgb(13,56,255)" 
    />

</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { ShipContext } from "../../framework";

@Component({})
export default class Ship extends Vue {

    @Prop({ required: true }) context: ShipContext;

    loaded = true;
    
    async mounted(){
       console.log('SHIP',this.context, this.context.positionX)
    };

    get shipX(){ return this.context.positionX }
    get shipY(){ return this.context.positionY }

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

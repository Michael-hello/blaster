<template>

    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        fill="pink" 
        viewBox="0 0 16 16"
        :x=gateX 
        :y=gateY >
    </svg>

</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { IGate } from "../../framework";

@Component({})
export default class GateView extends Vue {

    @Prop({ required: true }) gate: IGate;

    get gateX(){ return this.gate.x };
    get gateY(){ return this.gate.y };

    mounted() {
        // console.log('gate', this.gateX, this.gateY)
    }

}

</script>

<style scoped>


</style>

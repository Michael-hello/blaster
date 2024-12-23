<template>

    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        :width="height" 
        :height="height" 
        :viewBox=viewBox
        preserveAspectRatio="none"
    >

        <g v-for="(column, index) in columns" :key="index + 'a'" class=rotate :transform="`rotate(45)`">
            <rect 
                :width="columnWidth" 
                :height="columnWidth" 
                :x=column.x 
                :y=column.y 
                :style=columnStyle
            />
        </g>

        <line 
            :x1="columns[0].x" 
            :y1="columns[0].y + (columnWidth/2)" 
            :x2="columns[1].x" 
            :y2="columns[1].y + (columnWidth/2)" 
            stroke="white" 
            stroke-width="1" 
        />

    </svg>

</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { Gate, IGate, ILocation } from "../../framework";

@Component({})
export default class GateView extends Vue {

    @Prop({ required: true }) gate: Gate;
    @Prop({ required: true }) height: number;

    get gateX(){ return this.gate.x };
    get gateY(){ return this.gate.y };

    get length(){ return this.gate.length };
    get rotation(){ return this.gate.rotation };

    get columnStyle(){
        let colour = "rgb(255,255,255)";
        return `fill:${colour}; stroke-width: 3; stroke:${colour};`;
    };
    get columnWidth(){ return this.gate.columnHeight };

    get columns(){ 
        let mid = this.height / 2;
        let offset = this.length / 2;
        return [ 
            { x: mid - offset, y: mid }, 
            { x: mid + offset, y: mid } 
        ];
    };

    get viewBox(){
        return `0 0 ${this.height} ${this.height}`;
    };

    mounted() {
        console.log('gate', this.length)
    }

}

</script>

<style scoped>

.rotate {
  transform-box: fill-box;
  transform-origin: center;
}

</style>

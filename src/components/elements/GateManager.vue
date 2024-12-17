<template>
    <g>
        <gate-view
            v-for="gate in gates" 
            :key="gate.id" 
            :gate=gate 
        />
    </g>

</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { IOptions } from '../../framework';
import { GateManager } from "../../framework/gates";
import GateView from './Gate.vue';

@Component({
  components: {
    GateView
  }
})
export default class GateManagerView extends Vue {

    @Prop({ required: true }) context: GateManager;
    @Prop({ required: true }) options: IOptions;

    get gates(){ return this.context.gates };  

}

</script>

<style scoped>

</style>

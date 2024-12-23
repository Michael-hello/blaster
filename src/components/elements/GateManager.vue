<template>
    <g>
      <g v-for="gate in gates" :key="gate.id" 
        :transform="`rotate(${gate.rotation})`"
        class="rotate">

          <gate-view  
              v-if="gate.alive"          
              :gate=gate 
              :height=elmHeight
              :x="gate.x - (elmHeight / 2)" 
              :y="gate.y - (elmHeight / 2)"
          />
      </g>
    </g>

</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { IOptions } from '../../framework';
import { Gate, GateManager } from "../../framework/gates";
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

    get gateLength(){ return this.options.gateLength };

    elmHeight = 1000;
}

</script>

<style scoped>
.rotate {
  transform-box: fill-box;
  transform-origin: center;
}
</style>

<template>
    <g>
        <enemy-ship 
            v-for="enemy in enemies" 
            :key="enemy.id" 
            :enemy=enemy 
        />
    </g>

</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { IOptions } from '../../framework';
import EnemyShip from './Enemy.vue';

@Component({
  components: {
    EnemyShip
  }
})
export default class EnemyManager extends Vue {

    @Prop({ required: true }) context: EnemyManager;
    @Prop({ required: true }) options: IOptions;

    get enemies(){ return this.context.enemies };   

}

</script>

<style scoped>

</style>

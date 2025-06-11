<template>
    <g>
        <enemy-symbols />
        <use 
            v-for="enemy in enemies" 
            :key="enemy.id" 
            :x=enemy.x
            :y=enemy.y
            href="#enemy-icon-very-small"
        />

        <!-- <enemy-ship 
            v-for="enemy in enemies" 
            :key="enemy.id" 
            :enemy=enemy 
        /> -->
    </g>

</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { EnemyManager, IOptions } from '../../framework';
import EnemySymbols from './Enemy.vue';

@Component({
  components: {
    EnemySymbols
  }
})
export default class EnemyManagerView extends Vue {

    @Prop({ required: true }) context: EnemyManager;
    @Prop({ required: true }) options: IOptions;

    get enemies(){ return this.context.enemies.filter(x => x.alive) };  

}

</script>

<style scoped>

</style>

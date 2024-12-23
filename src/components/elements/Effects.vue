<template>
    <g>
        <explosion 
            v-for="(explosion, index) in explosions" 
            :key=index 
            :x="getPositionX(explosion)"
            :y="getPositionY(explosion)"
            :explosion=explosion
        />
    </g>

</template>


<script lang="ts">

import { Subject } from "rxjs";
import { Component, Vue, Prop } from "vue-property-decorator";
import { BaseContext, EnemyDeath, Event, IExplosion, isGateSmashEvent } from "../../framework";
import Explosion from "./Explosion.vue";

@Component({
    components: {
        Explosion
    }
})
export default class Effects extends Vue {

    @Prop({ required: true }) events: Subject<Event>;

   explosions: IExplosion[] = [];
   context = new BaseContext();

    mounted() {
        let sub = this.events.pipe(
        ).subscribe((event) => {
            if(isGateSmashEvent(event)) 
                this.addExplosion(event.x, event.y, event.topic, 'red', 50);
            
            if(event.topic == EnemyDeath)
                this.addExplosion(event.x, event.y, event.topic, 'blue', 150);            
        }); 


        this.context.subscriptions.push(sub);
    };

    addExplosion(x: number, y: number, type: string, colour: string, size: number) {
        console.log('EXPLOSION', type)
        let explosion: IExplosion = {
            type,
            x: x,
            y: y,
            colour,
            size
        };
        this.explosions.push(explosion);
    };

    beforeDestroy() {
        if(this.context && !this.context.disposed)
            this.context.dispose();
    };

    getPositionX(exp: IExplosion) {
        let offset = 200 - exp.size;
        return exp.x - offset;
    };

    getPositionY(exp: IExplosion) {
        let offset = 200 - exp.size;
        return exp.y - (offset)
    };

}

</script>

<style scoped>

    .svg-effects {
        background-color: blue;
        border: 1px solid black;
    }

</style>

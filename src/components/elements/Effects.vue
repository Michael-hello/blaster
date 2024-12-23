<template>
    <g>
        <explosion 
            v-for="(explosion, index) in explosions" 
            :key=index 
            :x="explosion.x - 100"
            :y="explosion.y - 100"
            :explosion=explosion
        />
    </g>

</template>


<script lang="ts">

import { Subject } from "rxjs";
import { Component, Vue, Prop } from "vue-property-decorator";
import { BaseContext, Event, IExplosion, isGateSmashEvent } from "../../framework";
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
            if(isGateSmashEvent(event)) {
                let explosion: IExplosion = {
                    type: event.topic,
                    x: event.x,
                    y: event.y,
                    colour: 'red'
                };
                this.explosions.push(explosion);
            };
        }); 
        this.context.subscriptions.push(sub);
    };

    beforeDestroy() {
        if(this.context && !this.context.disposed)
            this.context.dispose();
    }

}

</script>

<style scoped>

    .svg-effects {
        background-color: blue;
        border: 1px solid black;
    }

</style>

<template>
  <div id="svg-container" ref=elmt>
    <svg 
        :viewBox="viewbox"
        v-if=loaded
        ref=svg 
        class=svg
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        version="1.2"
    >
      <ship 
        :context=shipContext 
        :options="options"
      />

      <enemy-view v-for="enemy in enemies" :key="enemy.id" :enemy=enemy />

    </svg>
  </div>
</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { MainContext, KeyPressDown, KeyPressUp, keys, Enemy, IOptions, altKeys } from '../framework';
import Ship from './elements/Ship.vue';
import EnemyView from './elements/Enemy.vue';

@Component({
  components: {
    Ship,
    EnemyView
  }
})
export default class Animation extends Vue {

    @Prop({ required: true }) context: MainContext;
    @Prop({ required: true }) options: IOptions;

    loaded = false;
    elmTop = 0;
    elmLeft = 0;
    elmHeight = 0;
    elmWidth = 0;

    get shipContext(){ return this.context.ship };

    get enemies(){ return this.context.enemy.enemies };

    get viewbox() {
        let offX = this.elmLeft;
        let offY = this.elmTop;
        let w = this.elmWidth;
        let h = this.elmHeight;
        return `${0}, ${0}, ${w}, ${h}`;
    };

    async mounted(){
        window.addEventListener('keydown', (e) => this.keyDown(e));
        window.addEventListener('keyup', (e) => this.keyUp(e));

        let cllBck = () => {
            let size = (this.$refs.elmt as HTMLElement).getBoundingClientRect();
            this.elmLeft = size.left;
            this.elmTop = size.top;
            this.elmHeight = Math.ceil(size.height);
            this.elmWidth = size.width;
            this.context.updateDiemnsions(this.elmWidth, this.elmHeight);
        };

        cllBck();
        this.observeHeight(cllBck);

        this.context.initialise(this.elmWidth, this.elmHeight);
        this.loaded = true;
    };

    observeHeight(cllBck: () => void) {
        const resizeObserver = new ResizeObserver(function(x) {
            cllBck();
        });

        resizeObserver.observe(document.getElementById('svg-container'));
    };

    keyDown(event: KeyboardEvent){
      this.processKey(event.key, KeyPressDown);
    };

    keyUp(event: KeyboardEvent){
      this.processKey(event.key, KeyPressUp);
    };

    processKey(key: string, direction: string) {
      let isAltKey = altKeys.find(x => x == key) != null;
      if(isAltKey) key = this.mapAltKey(key);

      let valid = keys.find(x => x == key) != null;
      if(valid)  this.context.events.next({ topic: direction, key: key });
    };

    /** maps an alternative key to a WASD key */
    mapAltKey(key: string) : string {
      if( key == 'ArrowRight' ) return 'd';
      if( key == 'ArrowLeft' ) return 'a';
      if( key == 'ArrowUp' ) return 'w';
      if( key == 'ArrowDown' ) return 's'; 
    };

    beforeDestroy(){
      window.removeEventListener('keydown', (e) => this.keyDown(e));
      window.removeEventListener('keyup', (e) => this.keyUp(e));
    };

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

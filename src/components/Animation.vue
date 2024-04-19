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
      <ship :context=shipContext />

    </svg>
  </div>
</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { MainContext, KeyPressDown, KeyPressUp, keys } from '../framework';
import Ship from './elements/Ship.vue';


@Component({
  components: {
    Ship
  }
})
export default class Animation extends Vue {

    @Prop({ required: true }) context: MainContext;

    loaded = false;
    elmTop = 0;
    elmLeft = 0;
    elmHeight = 0;
    elmWidth = 0;

    get shipContext(){ return this.context.ship }

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
        this.context.initialise(this.elmWidth, this.elmHeight);
        this.observeHeight(cllBck);
        this.loaded = true;
    };

    observeHeight(cllBck: () => void) {
        const resizeObserver = new ResizeObserver(function(x) {
            cllBck();
        });

        resizeObserver.observe(document.getElementById('svg-container'));
    };

    mouseMove(event: MouseEvent){
        // console.log(event)
    };

    keyDown(event: KeyboardEvent){
      let valid = keys.find(x => x == event.key) != null;
      if(valid)  this.context.events.next({ topic: KeyPressDown, key: event.key });
    };

    keyUp(event: KeyboardEvent){
      let valid = keys.find(x => x == event.key) != null;
      if(valid)  this.context.events.next({ topic: KeyPressUp, key: event.key });
    };

    beforeDestroy(){
        window.removeEventListener('keydown', (e) => this.keyDown(e));
        window.removeEventListener('keyup', (e) => this.keyUp(e));
    }

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

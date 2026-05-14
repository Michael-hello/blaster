<template>
  <div id="keypad">

    <div v-for="key in ['UP', 'DOWN', 'LEFT', 'RIGHT']" :key="key" class="btn" 
        @touchstart="keyDown(key)" 
        @touchend="keyUp(key)" 
        @mousedown="keyDown(key)" 
        @mouseup="keyUp(key)" 
        :id="key.toLowerCase()">
        {{ key }}
    </div>
 
  </div>
</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { MainContext, KeyPressDown, KeyPressUp, keys, Enemy, IOptions } from '../framework';

type KeyEvent = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

@Component({ })
export default class KeyPad extends Vue {

    @Prop({ required: true }) context: MainContext;
    @Prop({ required: true }) options: IOptions;

    loaded = false;   

    get shipContext(){ return this.context.ship };
   
   
    async mounted(){       
        this.loaded = true;
    };

    keyDown(key: KeyEvent){
        console.log(key, 'down');
      this.processKey(key, KeyPressDown);
    };

    keyUp(key: KeyEvent){
      this.processKey(key, KeyPressUp);
    };

    processKey(btn: string, direction: string) {
      let key = this.mapKeys(btn);
      let valid = keys.find(x => x == key) != null;
      console.log(direction, valid, btn)
      if(valid)  this.context.events.next({ topic: direction, key: key });
    };

    /** maps a key to a WASD key */
    mapKeys(btn: string) : string {
      if( btn == 'RIGHT' ) return 'd';
      if( btn == 'LEFT' ) return 'a';
      if( btn == 'UP' ) return 'w';
      if( btn == 'DOWN' ) return 's'; 
    };

}

</script>

<style scoped>
    #keypad {
        position: relative;
        bottom: 0;
        left: 0;
        height: 80px;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 5px;
        padding: 5px;
    }

    #up{
        /* grid-row-start / grid-column-start / grid-row-end / grid-column-end */
        grid-area: 1 / 2 / 1 / 2;
    }
    #down{
        grid-area: 2 / 2 / 2 / 2;
    }
    #left{
        grid-area: 1 / 1 / span 2 / 1;
    }
    #right{
        grid-area: 1 / 3 / span 2 / 3;
    }

    .btn {
        background-color: rgba(255, 255, 255, 0.2);
        border: 1px solid white;
        border-radius: 5px;
        color: white;
        font-size: 20px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        height: 100%;
        width: 100%;
        z-index: 100000;
    }

</style>

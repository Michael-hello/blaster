<template>

<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <rect width="200" height="200" fill="none" />
  <!-- Explosion fragments -->
  <g>
    <!-- Fragment 1 -->
    <circle cx="100" cy="100" r="4" fill="orange">
      <animate attributeName="cx" from="100" to="160" dur="0.6s" fill="freeze" />
      <animate attributeName="cy" from="100" to="40" dur="0.6s" fill="freeze" />
      <animate attributeName="opacity" from="1" to="0" dur="0.6s" fill="freeze" />
    </circle>
    <!-- Fragment 2 -->
    <circle cx="100" cy="100" r="4" fill="yellow">
      <animate attributeName="cx" from="100" to="40" dur="0.6s" fill="freeze" />
      <animate attributeName="cy" from="100" to="160" dur="0.6s" fill="freeze" />
      <animate attributeName="opacity" from="1" to="0" dur="0.6s" fill="freeze" />
    </circle>
    <!-- Fragment 3 -->
    <circle cx="100" cy="100" r="4" fill="red">
      <animate attributeName="cx" from="100" to="160" dur="0.6s" fill="freeze" />
      <animate attributeName="cy" from="100" to="160" dur="0.6s" fill="freeze" />
      <animate attributeName="opacity" from="1" to="0" dur="0.6s" fill="freeze" />
    </circle>
    <!-- Fragment 4 -->
    <circle cx="100" cy="100" r="4" fill="orange">
      <animate attributeName="cx" from="100" to="40" dur="0.6s" fill="freeze" />
      <animate attributeName="cy" from="100" to="40" dur="0.6s" fill="freeze" />
      <animate attributeName="opacity" from="1" to="0" dur="0.6s" fill="freeze" />
    </circle>
    <!-- Fragment 5 -->
    <circle cx="100" cy="100" r="3" fill="yellow">
      <animate attributeName="cx" from="100" to="120" dur="0.6s" fill="freeze" />
      <animate attributeName="cy" from="100" to="30" dur="0.6s" fill="freeze" />
      <animate attributeName="opacity" from="1" to="0" dur="0.6s" fill="freeze" />
    </circle>
    <!-- Fragment 6 -->
    <circle cx="100" cy="100" r="3" fill="red">
      <animate attributeName="cx" from="100" to="80" dur="0.6s" fill="freeze" />
      <animate attributeName="cy" from="100" to="170" dur="0.6s" fill="freeze" />
      <animate attributeName="opacity" from="1" to="0" dur="0.6s" fill="freeze" />
    </circle>
    <!-- Fragment 7 -->
    <circle cx="100" cy="100" r="3" fill="orange">
      <animate attributeName="cx" from="100" to="180" dur="0.6s" fill="freeze" />
      <animate attributeName="cy" from="100" to="100" dur="0.6s" fill="freeze" />
      <animate attributeName="opacity" from="1" to="0" dur="0.6s" fill="freeze" />
    </circle>
    <!-- Fragment 8 -->
    <circle cx="100" cy="100" r="3" fill="yellow">
      <animate attributeName="cx" from="100" to="20" dur="0.6s" fill="freeze" />
      <animate attributeName="cy" from="100" to="100" dur="0.6s" fill="freeze" />
      <animate attributeName="opacity" from="1" to="0" dur="0.6s" fill="freeze" />
    </circle>
  </g>
  <!-- Central burst with more detail -->
  <g>
    <circle cx="100" cy="100" r="10" fill="yellow">
      <animate attributeName="r" from="10" to="50" dur="0.6s" fill="freeze" />
      <animate attributeName="opacity" from="1" to="0.5" dur="0.3s" fill="freeze" />
      <animate attributeName="opacity" from="0.5" to="0" dur="0.3s" begin="0.3s" fill="freeze" />
    </circle>
    <circle cx="100" cy="100" r="5" fill="orange">
      <animate attributeName="r" from="5" to="40" dur="0.6s" fill="freeze" />
      <animate attributeName="opacity" from="1" to="0" dur="0.6s" fill="freeze" />
    </circle>
    <circle cx="100" cy="100" r="2" fill="red">
      <animate attributeName="r" from="2" to="30" dur="0.6s" fill="freeze" />
      <animate attributeName="opacity" from="1" to="0" dur="0.6s" fill="freeze" />
    </circle>
  </g>
</svg>

</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";
import { IExplosion } from "../../framework";

@Component({})
export default class Explosion extends Vue {

    @Prop({ required: true }) explosion: IExplosion;

    mounted() {
        console.log('boom')
    }

}

</script>

<style scoped>

    .svg-effects {
        background-color: blue;
        border: 1px solid black;
    }

</style>

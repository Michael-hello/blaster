<template>

  <svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
    <!-- Main saucer disc (blue) -->
    <ellipse 
      cx="65" 
      cy="70" 
      rx="48" 
      ry="20" 
      fill="rgb(30, 144, 255)" 
      stroke="rgb(0, 102, 204)" 
      stroke-width="2"
    />
    
    <!-- Saucer top edge highlight (lighter blue) -->
    <ellipse 
      cx="65" 
      cy="68" 
      rx="46" 
      ry="18" 
      fill="rgb(70, 180, 255)" 
      stroke="none"
    />
    
    <!-- Dome/cockpit (blue) -->
    <path 
      fill="rgb(20, 120, 220)" 
      stroke="rgb(0, 102, 204)" 
      stroke-width="2"
      d="M45,70 Q45,40 65,35 Q85,40 85,70"
    />
    
    <!-- Dome highlight (yellow glow) -->
    <ellipse 
      cx="65" 
      cy="48" 
      rx="12" 
      ry="14" 
      fill="rgb(255, 223, 0)" 
      opacity="0.7"
    />
    
    <!-- Central window (yellow) -->
    <circle 
      cx="65" 
      cy="50" 
      r="5" 
      fill="rgb(255, 255, 100)" 
      stroke="rgb(255, 200, 0)" 
      stroke-width="1"
    />
    
    <!-- Left porthole (yellow) -->
    <circle 
      cx="48" 
      cy="68" 
      r="3" 
      fill="rgb(255, 200, 0)" 
      stroke="rgb(200, 150, 0)" 
      stroke-width="0.5"
    />
    
    <!-- Center-left porthole (yellow) -->
    <circle 
      cx="56" 
      cy="72" 
      r="3" 
      fill="rgb(255, 200, 0)" 
      stroke="rgb(200, 150, 0)" 
      stroke-width="0.5"
    />
    
    <!-- Center-right porthole (yellow) -->
    <circle 
      cx="74" 
      cy="72" 
      r="3" 
      fill="rgb(255, 200, 0)" 
      stroke="rgb(200, 150, 0)" 
      stroke-width="0.5"
    />
    
    <!-- Right porthole (yellow) -->
    <circle 
      cx="82" 
      cy="68" 
      r="3" 
      fill="rgb(255, 200, 0)" 
      stroke="rgb(200, 150, 0)" 
      stroke-width="0.5"
    />
    
    <!-- Left landing gear (yellow) -->
    <line 
      x1="35" 
      y1="90" 
      x2="30" 
      y2="110" 
      stroke="rgb(255, 200, 0)" 
      stroke-width="2"
      stroke-linecap="round"
    />
    <circle 
      cx="30" 
      cy="112" 
      r="2.5" 
      fill="rgb(255, 200, 0)"
    />
    
    <!-- Center-left landing gear (yellow) -->
    <line 
      x1="52" 
      y1="90" 
      x2="50" 
      y2="108" 
      stroke="rgb(255, 200, 0)" 
      stroke-width="2"
      stroke-linecap="round"
    />
    <circle 
      cx="50" 
      cy="110" 
      r="2.5" 
      fill="rgb(255, 200, 0)"
    />
    
    <!-- Center-right landing gear (yellow) -->
    <line 
      x1="78" 
      y1="90" 
      x2="80" 
      y2="108" 
      stroke="rgb(255, 200, 0)" 
      stroke-width="2"
      stroke-linecap="round"
    />
    <circle 
      cx="80" 
      cy="110" 
      r="2.5" 
      fill="rgb(255, 200, 0)"
    />
    
    <!-- Right landing gear (yellow) -->
    <line 
      x1="95" 
      y1="90" 
      x2="100" 
      y2="110" 
      stroke="rgb(255, 200, 0)" 
      stroke-width="2"
      stroke-linecap="round"
    />
    <circle 
      cx="100" 
      cy="112" 
      r="2.5" 
      fill="rgb(255, 200, 0)"
    />
  </svg>



</template>


<script lang="ts">

import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class ShipIcon extends Vue {

    
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

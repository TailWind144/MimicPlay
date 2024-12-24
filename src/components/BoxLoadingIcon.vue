<template>
  <div class="load-container">
    <div class="container">
      <div class="boxLoading boxLoading1"></div>
      <div class="boxLoading boxLoading2"></div>
      <div class="boxLoading boxLoading3"></div>
      <div class="boxLoading boxLoading4"></div>
      <div class="boxLoading boxLoading5"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.load-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.load-container > .container {
  width: 50px;
  height: 60px;
  display: flex;
  justify-content: center;
  gap: 2px;
}
.boxLoading {
  background-color: #f59e0b;
  height: 100%;
  width: 6px;
  display: inline-block;
  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
.boxLoading2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
.boxLoading3 {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}
.boxLoading4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}
.boxLoading5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}
@keyframes stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleY(1);
  }
}
</style>

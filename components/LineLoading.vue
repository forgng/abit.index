<template>
<div class="line-loading-wrapper">
    <div class="progress">
          <div class="indeterminate" style="background-color: #05c3b6"></div>
      </div>
</div>
</template>

<style lang="scss">
@import '~/assets/styles/variables.scss';

.line-loading-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
}
.progress {
  position: relative;
  height: 3px;
  display: block;
  width: 100%;
  background-color: #acece6;
  // border-radius: 2px;
  // margin: 0.5rem 0 1rem 0;
  overflow: hidden;
}

.indeterminate {
  background-color: $mainColor;
  &::before {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)
      infinite;
  }
  &::after {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1)
      infinite;
    animation-delay: 1.15s;
  }
}

@keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
}

@keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
}
</style>

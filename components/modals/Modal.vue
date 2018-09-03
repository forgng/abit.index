<template>
 <transition name="t-modal">
    <div class="modal-mask" @click="$emit('close')">
        <div class="modal-container" @click.stop>
            <i class="material-icons icon-close-modal" @click="$emit('close')">close</i>
            <div class="modal-header">
              <slot name="header">
              </slot>
            </div>
            <div class="modal-body">
              <slot name="body">
              </slot>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  mounted() {
    const d = document.body;
    d.className += ' no-scroll';
  },
  destroyed() {
    const d = document.body;
    d.className = '';
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';

.icon-close-modal {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  @media screen and (max-width: $break-modal) {
    top: 4px;
    right: 2px;
  }
  &.login {
    position: absolute;
    top: 3%;
    right: 1.5%;
    cursor: pointer;
  }
}

.modal-mask {
  position: fixed;
  z-index: 100000;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  position: fixed;
  padding: 30px;
  z-index: 1001;
  width: 90%;
  max-height: 90%;
  top: 5%;
  overflow-y: auto;
  background-color: #fff;
  color: $baseTextColor;
  border-radius: 2px;
  box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  &.login {
    width: 60%;
    top: 20%;
  }
  @media screen and (max-width: $break-medium) {
    width: 70%;
  }
  @media screen and (min-width: $break-very-large) {
    width: 70%;
  }
  @media screen and (max-width: $break-small) {
    padding: 15px;
  }
  @media screen and (max-width: $break-modal) {
    min-width: 100%;
    min-height: 100vh;
    border-radius: 0;
    top: 0;
  }
}

.modal-header {
  text-align: center;
  h5 {
    font-size: 20px;
  }
  &:empty {
    display: none;
  }
}

.t-modal-enter {
  opacity: 0;
}

.t-modal-leave-active {
  opacity: 0;
}

.t-modal-enter .modal-container,
.t-modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

<template>
<div class="connection-container">
  <template v-if="maxNumOfRetriesReached">
    <div class="connection"/>
    <div class="message">No connection</div>
  </template>
</div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ConnectionStatus',
  computed: {
    ...mapGetters(['maxNumOfRetriesReached']),
  },
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/variables.scss';
.connection-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  width: 100%;
}
.connection {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: $red;
}
.message {
  white-space: nowrap;
}
</style>


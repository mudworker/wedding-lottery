<template>
  <div class="app">
    <!-- <Config></Config> -->
    <Lottery></Lottery>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Config from './pages/Config.vue';
import Lottery from './pages/Lottery.vue';
import { useSoundStore } from './stores/sound';

const soundStore = useSoundStore()

// 注册所有音效
soundStore.register('bgm', '/audios/bgm.mp3', { loop: true, volume: 0.3 })
// soundStore.register('win', '/assets/audios/win.mp3')

onMounted(() => {
  soundStore.play('bgm')
})
</script>

<style lang='scss' scoped>
.app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>

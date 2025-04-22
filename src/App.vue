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
soundStore.register('bgm', '/audios/bgm.mp3', { loop: true, volume: 0.1 })
soundStore.register('start', '/audios/start.mp3')
soundStore.register('roll', '/audios/roll.mp3')
soundStore.register('bo', '/audios/bo.mp3')
soundStore.register('celebrate', '/audios/celebrate.mp3')

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

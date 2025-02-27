<template>
    <div class="scolls">
        <ScrollNum ref="snRef" v-for="(num, index) in numList" :key="index" :num="num" :delay="2 + index / 2"
            :size="'large'" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ScrollNum from './ScrollNum.vue';
const props = defineProps(['number'])

const numList = computed(() => {
    // 确保三位数
    let n = props.number.toString()
    if (n.length === 1) {
        n = '00' + n
    } else if (n.length === 2) {
        n = '0' + n
    }
    return n.split('')
})

</script>

<style lang='scss' scoped>
.scolls {
    display: flex;
    height: fit-content;
    border: 1px solid #000;
}
</style>
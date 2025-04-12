<template>
    <div class="scroll-box border-animate" :style="scrollStyle" @animationend="handleAnimationEnd">
        <ul class="scroll-num" :class="{ animate: showAnimate }">
            <li class="num" :class="'num' + (i - 1)" v-for="i of 10"></li>
            <li class="num" :class="'num0'"></li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useLotteryStore } from '../stores/lottery';

const lotteryStore = useLotteryStore()

const props = defineProps(["num", "delay"])
let showAnimate = ref(true)
const scrollStyle = computed(() => {
    return {
        "--num": props.num, // CSS变量，提供到style使用
        "--delay": props.delay,
    };
})

function handleAnimationEnd() {
    lotteryStore.drawFinish()
    showAnimate.value = false
}

watch(() => lotteryStore.isDrawing, (val) => {
    if (val) {
        showAnimate.value = true
    }
})
</script>

<style lang="scss" scoped>
.scroll-box {
    --width: 50px;
    --height: calc(var(--width) * 1.7);
    width: var(--width);
    height: var(--height);
    text-align: center;
    border-radius: 5px;
    overflow: hidden;
    flex-shrink: 0;
    /* background-color: red; */
}

.animate {
    animation: move 1s linear infinite,
        num-bounce 1s calc(var(--delay) * 1s) forwards;
    /* forwards:停在动画的最后一帧 */
}

.border-animate {
    animation: border-bounce 1s calc(var(--delay) * 1s) forwards;
}

.scroll-num {
    padding: 0;
    margin: 0;
    list-style: none;
    transform: translateY(calc(var(--num) * -9.09%));
    /* height: 100%; */
}

.num {
    background-size: auto 80%;
    height: var(--height);
    width: 100%;
    background-repeat: no-repeat;
    background-position: 50% 50%;
}
</style>

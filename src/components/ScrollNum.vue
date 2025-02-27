<template>
    <div class="scroll-box border-animate" :style="scrollStyle" @animationend="handleAnimationEnd">
        <ul ref="num" class="scroll-num" :class="{ animate: showAnimate }">
            <li>0</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>
            <li>8</li>
            <li>9</li>
            <li>0</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useLotteryStore } from '../stores/lottery';

const lotteryStore = useLotteryStore()

const props = defineProps(["num", "delay", "size"])
let showAnimate = ref(true)
const scrollStyle = computed(() => {
    const sizeMap = {
        small: "20px",
        medium: "36px",
        large: "56px",
    }[props.size];
    return {
        "--num": props.num, // CSS变量，提供到style使用
        "--delay": props.delay,
        "--width": sizeMap,
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

<style scoped>
.scroll-box {
    width: var(--width, 20px);
    height: calc(var(--width, 20px) * 1.8);
    /* color: #fff; */
    font-size: calc(var(--width, 20px) * 1.1);
    line-height: calc(var(--width, 20px) * 1.8);
    text-align: center;
    /* border: 1px solid #fff; */
    border-radius: 5px;
    /* margin-right: 30px; */
    overflow: hidden;
    flex-shrink: 0;
    /* 保证不被压缩 */
}

.animate {
    animation: move 1s linear infinite,
        num-bounce 1s calc(var(--delay) * 1s) forwards;
    /* forwards:停在动画的最后一帧 */
}

​ .border-animate {
    animation: border-bounce 1s calc(var(--delay) * 1s) forwards;
}

.scroll-num {
    padding: 0;
    margin: 0;
    list-style: none;
    transform: translateY(calc(var(--num) * -9.09%));
}
</style>

<template>
    <div class="result-num">
        <div v-for="num in numList" class="num" :class="'num' + num"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const props = defineProps(['number'])
let numList = ref([])

function splitNumberToArray(num) {
    let numStr = num.toString().padStart(3, '0'); // 确保至少3位，前面补0
    return numStr.split('').map(digit => parseInt(digit, 10)); // 拆分成数组并转换为整数
}
onMounted(() => {
    numList.value = splitNumberToArray(props.number)
})

</script>

<style lang='scss' scoped>
.result-num {
    display: flex;

    .num {
        background-size: auto 80%;
        height: 50px;
        width: 30px;
        background-repeat: no-repeat;
        background-position: 50% 50%;
    }
}
</style>
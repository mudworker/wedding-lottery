<template>
  <div class="main">
    <!-- 背景 -->
    <div class="bgs"></div>
    <!-- 抽奖 -->
    <div class="lottery">
      <div class="scrolls">
        <Scrolls class="scroll" v-for="num in resultList" :number="num" />
      </div>
      <div class="draw">
        <div class="drop" @click="handleLottery">click me to draw</div>
        <div class="drop" @click="lotteryStore.restart">restart</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Scrolls from './components/Scrolls.vue';
import { useLotteryStore } from './stores/lottery';
import storage from './utils/storage';

const lotteryStore = useLotteryStore()

let resultList = ref<number[]>([]) // 结果

// 初始化数据
let totalList: number[] = []

function init() {
  // 初始化结果集合
  resultList.value = Array(lotteryStore.drawCount).fill(888)
  // 构造所有号码集合 1 ~ total 号
  totalList = Array.from({ length: lotteryStore.total }, (_, i) => 1 + (i))
  // 查询缓存中的结果，并去除
  lotteryStore.historyRecords = storage.getItem('historyRecords') ?? []
  lotteryStore.roundIndex = storage.getItem('roundIndex') ?? 1
  const records = lotteryStore.historyRecords.flat()
  totalList = totalList.filter(item => !records.includes(item))
}

// 抽奖
function handleLottery() {
  if (lotteryStore.isDrawing) {
    // 正在抽奖
    return
  }
  if (totalList.length < lotteryStore.drawCount) {
    console.log('已经没有这么多号码啦！')
    return
  }
  if (lotteryStore.roundIndex > lotteryStore.drawRounds) {
    console.log('已经结束了所有抽奖轮次！')
    return
  }
  
  lotteryStore.isDrawing = true
  let res: any = []
  // 随机这一轮的所有号码
  for (let i = 0; i < lotteryStore.drawCount; i++) {
    res.push(handleDrawOne())
  }

  lotteryStore.recordRes(res)
  resultList.value = res
}

// 抽取一个号码
function handleDrawOne() {
  // 获取目前的数组最大下标
  let t = totalList.length - 1
  // 生成随机数 0~t
  let i = Math.floor(Math.random() * (t + 1))
  // 在总数组中去除此结果，放置重复
  return totalList.splice(i, 1)[0]
}

onMounted(() => {
  init()
})

</script>

<style lang='scss' scoped>
.main {
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;

  .lottery {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;

    .scrolls {
      flex: 1;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      .scroll {
        margin: 0 100px;
      }
    }

    .draw {
      width: 200px;

      .drop {}
    }
  }

}
</style>

<template>
    <div class="lottery">
        <!-- 背景 -->
        <div class="bgs"></div>
        <!-- 抽奖 -->
        <div class="main">
            <div class="left">
                <div class="draw-part">
                    <div class="machine"></div>
                    <div ref="spainRef" class="spain" :class="{ 'isPull': isPull }" @click="handleLottery"></div>
                    <div class="pops" v-if="!lotteryStore.isDrawing && !isPull && lotteryStore.roundIndex > 1">
                        <div class="pop" :class="'pop' + i" v-for="i in 6"></div>
                    </div>
                    <Scrolls class="scroll" :class="'scroll' + i" v-for="(num, i) in resultList" :number="num" />
                </div>
            </div>
            <div class="right">
                <div class="history">
                    <div class="round" v-for="(r, i) in lotteryStore.historyRecords">
                        <div class>Round {{ i + 1 }}</div>
                        <div class="res">
                            <ResultNum v-for="n in r" :number="n"></ResultNum>
                        </div>
                    </div>
                </div>
                <div class="drop" @click="lotteryStore.restart">restart</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Scrolls from '../components/Scrolls.vue';
import ResultNum from '../components/ResultNum.vue';
import { useLotteryStore } from '../stores/lottery';
import storage from '../utils/storage';

const lotteryStore = useLotteryStore()

let resultList = ref<number[]>([]) // 结果

// 初始化数据
let totalList: number[] = []
// 控制手柄拉动动画
const spainRef = ref(null)
let isPull = ref(false)

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
    if (lotteryStore.isDrawing || isPull.value) {
        console.log('正在抽奖中，请稍等！')
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
    isPull.value = true
    spainRef.value.addEventListener('animationend', () => {
        console.log(1111)
        lotteryStore.isDrawing = true
        isPull.value = false
        let res: any = []
        // 随机这一轮的所有号码
        for (let i = 0; i < lotteryStore.drawCount; i++) {
            res.push(handleDrawOne())
        }

        lotteryStore.recordRes(res)
        resultList.value = res
    }, { once: true })
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
.lottery {
    position: relative;
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    background-color: #f1d6ff;

    .main {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;

        .left {
            flex: 1;
            height: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;

            .draw-part {
                position: relative;
                --top0: 361px;
                --top1: 460px;
                --top2: 562px;
                --left0: 272px;
                --left1: 453px;
                --left2: 638px;

                .machine {
                    background-image: url('../assets/images/main_2.png');
                    height: 1034px;
                    width: 1074px;
                }

                .spain {
                    position: absolute;
                    background-image: url('../assets//images/ball_2.png');
                    z-index: 10;
                    right: 5px;
                    top: 240px;
                    width: 234px;
                    height: 249px;
                    cursor: pointer;

                    &.isPull {
                        animation: pull .5s ease-in-out;
                    }
                }

                .pops {
                    position: absolute;
                    top: 0;
                    height: 0;

                    .pop {
                        position: absolute;
                    }

                    --showTime:.3s;

                    // 右侧金币
                    .pop1 {
                        left: 700px;
                        top: -20px;
                        animation: popAniShow var(--showTime) linear, popAni1 1s linear infinite var(--showTime);
                    }

                    // 左侧蓝色小花
                    .pop2 {
                        left: 150px;
                        top: -100px;
                        animation: popAniShow var(--showTime) linear, popAni2 1s linear infinite var(--showTime);
                    }

                    // 右侧粉色小花
                    .pop3 {
                        left: 920px;
                        top: 110px;
                        animation: popAniShow var(--showTime) linear, popAni3 1s linear infinite var(--showTime);
                    }

                    // 左侧金色小花
                    .pop4 {
                        left: 30px;
                        top: 250px;
                        animation: popAniShow var(--showTime) linear, popAni4 1s linear infinite var(--showTime);
                    }

                    // 左侧金币
                    .pop5 {
                        left: 0px;
                        top: 50px;
                        animation: popAniShow var(--showTime) linear, popAni5 1s linear infinite var(--showTime);
                    }

                    // 右侧小圆粉
                    .pop6 {
                        left: 650px;
                        top: -40px;
                        animation: popAniShow var(--showTime) linear, popAni6 1s linear infinite var(--showTime);
                    }
                }

                .scroll {
                    position: absolute;
                }

                .scroll0 {
                    top: var(--top0);
                    left: var(--left0);
                }

                .scroll1 {
                    top: var(--top0);
                    left: var(--left1);
                }

                .scroll2 {
                    top: var(--top0);
                    left: var(--left2);
                }

                .scroll3 {
                    top: var(--top1);
                    left: var(--left0);
                }

                .scroll4 {
                    top: var(--top1);
                    left: var(--left1);
                }

                .scroll5 {
                    top: var(--top1);
                    left: var(--left2);
                }

                .scroll6 {
                    top: var(--top2);
                    left: var(--left0);
                }

                .scroll7 {
                    top: var(--top2);
                    left: var(--left1);
                }

                .scroll8 {
                    top: var(--top2);
                    left: var(--left2);
                }


            }
        }

        .right {
            width: 40%;

            .history {
                display: flex;
                flex-direction: column;
                gap: 30px;

                .round {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;

                    .res {
                        display: flex;
                        gap: 30px;
                        flex-wrap: wrap;
                    }
                }
            }

            .drop {}
        }
    }

}
</style>
<template>
    <div class="setting">
        <Transition name="setting" @after-enter="onAfterEnter" @after-leave="onAfterLeave">
            <div class="outer" v-show="isShow">
                <div class="main">
                    <div class="close" @click="handleClose">❌</div>
                    <div class="history">
                        <div class="round" v-for="(r, i) in lotteryStore.historyRecords" :key="i">
                            <div class="name">Round {{ i + 1 }}</div>
                            <div class="res">
                                <div v-for="n in [...r].sort((a, b) => a - b)">{{ n }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useLotteryStore } from '../stores/lottery';

const lotteryStore = useLotteryStore()

const emits = defineEmits(['handleClose'])

let isShow = ref(false)

// 打开动画完毕
function onAfterEnter() {

}
// 关闭动画完毕
function onAfterLeave() {
    emits('handleClose')
}

function handleClose() {
    isShow.value = false
}


onMounted(() => {
    isShow.value = true
})

</script>

<style lang='scss' scoped>
.setting-enter-active {
    animation: setting-in 0.5s;
}

.setting-leave-active {
    animation: setting-in 0.5s reverse;
}

@keyframes setting-in {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.setting {
    background-color: #3434343a;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;

    .outer {
        width: 1200px;
        height: 1080px;
        // height: 880px;
        background-color: #fff;
        padding: 20px 23px 25px 20px;
        box-sizing: border-box;
        border-radius: 48px 51px 63px 58px;
        box-shadow: 10px 10px 1em #544a5a;

        .main {
            position: relative;
            box-sizing: border-box;
            border: 10px solid #000;
            width: 100%;
            height: 100%;
            border-radius: 40px 43px 55px 50px;
            padding: 70px 40px 40px 40px;
            background-color: rgb(255, 245, 215);

            .close {
                position: absolute;
                top: 20px;
                right: 40px;
                cursor: pointer;
                font-size: 38px;
                color:#ff6c90;
            }

            .history {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 30px;

                .round {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    .name {
                        font-size: 32px;
                    }

                    .res {
                        display: flex;
                        gap: 20px;
                        font-size: 30px;
                        >div{
                            flex: 1;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
}
</style>
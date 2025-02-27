// stores/counter.js
import storage from '../utils/storage'
import { defineStore } from 'pinia'

export const useLotteryStore = defineStore('lottery', {
    state: () => ({
        isDrawing: true, // 是否正在抽奖
        total: 40, // 总人数
        drawFinishCount: 0, // 抽奖完成计数
        drawCount: 10, // 抽奖的个数 每轮
        drawRounds: 3, // 抽奖轮数
        roundIndex: 1, // 当前是第几轮

        historyRecords: [], // 历史获奖记录
    }),
    actions: {
        // 结束滚动
        drawFinish() {
            this.drawFinishCount++
            if (this.drawFinishCount === this.drawCount * 3) {
                this.isDrawing = false
                this.drawFinishCount = 0
            }
        },
        // 记录本轮抽奖结果
        recordRes(res) {
            this.roundIndex++
            this.historyRecords.push(res)
            storage.setItem('historyRecords', this.historyRecords)
            storage.setItem('roundIndex', this.roundIndex)
        },
        // 开启新的抽奖
        restart() {
            storage.clear()
            window.location.reload();
        }
    },
})
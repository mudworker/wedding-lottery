<template>
  <div class="main">
    <div class="bg">
      <span id="message">点击抽奖</span>
      <div class="lotterybg">
        <canvas id="myCanvas" width="500px" height="700px"></canvas>
        <!-- <img src="img/lighting.png" class="lighting" /> -->
      </div>
    </div>
    <div @click="status = !status">{{ status ? 'stop' : 'start' }}</div>
    <img :src="ball01" id="ball1" class="imgSrc">
    <img :src="ball02" id="ball2" class="imgSrc">
    <img :src="ball03" id="ball3" class="imgSrc">
    <img :src="ball04" id="ball4" class="imgSrc">
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ball01 from './assets/images/1.png'
import ball02 from './assets/images/2.png'
import ball03 from './assets/images/3.png'
import ball04 from './assets/images/4.png'

class Ball {
  r = 60 // 小球半径
  speeds = [-20, -19, -18, -17, -16, -15, -14,]
  constructor(layerIdx, index, img, canvas, ctx) {
    this.color = index
    this.img = img
    this.canvas = canvas
    this.ctx = ctx
    this.x = this.rand(canvas.width - this.r * 2)//小球初始横坐标
    this.y = this.rand(canvas.height - this.r * 2)//小球初始纵坐标
    this.bx = 15 * (3 - layerIdx - 1)
    this.speedX = this.getRandomInRanges(10, 20)
    this.speedY = this.getRandomInRanges(5, 20)
    this.sX = this.speedX
    this.sY = this.speedY
  }
  rand(num) {//随机数
    return Math.random() * num;
  }
  getRandomInRanges(min, max) {
    // Decide the range: 50% chance for each range
    const isNegativeRange = Math.random() < 0.5;

    if (isNegativeRange) {
      // Random number between -20 and -10
      return Math.floor(Math.random() * (min + 1)) - max;
    } else {
      // Random number between 10 and 20
      return Math.floor(Math.random() * (min + 1)) + min;
    }
  }
  run() {//小球运动函数
    this.sX = this.speedX
    this.sY = this.speedY
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > this.canvas.width - this.r * 2) {//小球碰到右边界，横坐标速度变为负
      this.speedX = -this.speedX;
      this.x = this.canvas.width - this.r * 2
    }
    if (this.x < 0) {//小球碰到左边界，横坐标速度变为正
      this.speedX = Math.abs(this.speedX);
      this.x = 0
    }
    if (this.y > this.canvas.height - this.r * 2 - this.bx) {//小球碰到下边界，纵坐标速度变为负
      this.speedY = -this.speedY;
      this.y = this.canvas.height - this.r * 2 - this.bx
    }
    if (this.y < 0) {//小球碰到上边界，纵坐标速度变为正
      this.speedY = Math.abs(this.speedY);
      this.y = 0
    }
    this.ctx.drawImage(this.img, this.x, this.y, 2 * this.r, 2 * this.r);//绘制小球
  }
  stop() {
    if (this.sX > 0) {
      if (this.X <= 0.1) {
        this.sX = 0
      } else {
        this.sX -= 0.1
      }
    } else if (this.sX < 0) {
      if (this.sX >= -0.1) {
        this.sX = 0
      } else {
        this.sX += 0.1
      }
    }

    this.x += this.sX;
    this.y += this.sY;
    if (this.x >= this.canvas.width - this.r * 2) {//小球碰到右边界，横坐标速度变为负
      this.sX = -this.sX;
      this.x = this.canvas.width - this.r * 2
    }
    if (this.x <= 0) {//小球碰到左边界，横坐标速度变为正
      this.sX = Math.abs(this.sX);
      this.x = 0
    }
    if (this.y >= this.canvas.height - this.r * 2 - this.bx) {//小球碰到下边界，纵坐标速度变为负
      if (Math.abs(this.sY) <= 10) {
        this.sY = 0
      } else {
        this.sY -= 10
      }
      this.sY = -this.sY;
      this.y = this.canvas.height - this.r * 2 - this.bx
    } else {
      this.sY += 1
    }
    if (this.y <= 0) {//小球碰到上边界，纵坐标速度变为正
      this.sY = Math.abs(this.sY);
      this.y = 0
    }
    this.ctx.drawImage(this.img, this.x, this.y, 2 * this.r, 2 * this.r);//绘制小球
  }
}

let status = ref(false)
function init() {//初始化
  let canvas = document.getElementById('myCanvas');
  let ctx = canvas.getContext('2d');
  let ball1 = document.getElementById('ball1');//图片对象
  let ball2 = document.getElementById('ball2');//图片对象
  let ball3 = document.getElementById('ball3');//图片对象
  let ball4 = document.getElementById('ball4');//图片对象
  let ballList = [ball1, ball2, ball3, ball4];//图片对象数组
  let ballNum = 15;//扭蛋机里面的小球数
  let awardList = [];//扭蛋机中的小球集合
  let timer;//计时器
  for (let i = 0; i < ballNum; i++) {//随机生成各色小球
    let index = Math.floor(4 * Math.random());
    let layerIdx = i / (ballNum / 3)
    awardList[i] = new Ball(Math.floor(layerIdx), index, ballList[index], canvas, ctx);//新建小球对象
  }
  window.clearInterval(timer);//清除计时器
  timer = setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);//清空画布
    for (let i = 0; i < awardList.length; i++) {
      status.value ? awardList[i].run() : awardList[i].stop()
    }//使小球运动
  }, 15);
}

onMounted(() => {
  init()
})

</script>

<style lang='scss' scoped>
.main {}
</style>

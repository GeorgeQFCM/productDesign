// 悬浮按钮组件
<template>
  <!-- v-drag="{dragElSelector: '.button-box'}" -->
  <div>
    <div style="position:relative;">
      <div ref="boxRef" class="button-box" v-drag draggable="false">
        <div class="btn-bg-img"></div>

        <div class="font-box" @click="openBox">{{ text }}</div>
      </div>
    </div>

    <el-drawer :close-on-press-escape="true" :modal="false" class="drawerClass" title="设计历程" :visible.sync="isOpen"
      direction="rtl" custom-class="demo-drawer" ref="drawer" size="15%">
      <div class="demo-drawer__content">
        <el-form size="mini" :model="RecordForm" class="RecordFormClass" label-width="100px" label-position="right">
          <el-form-item>
            <label slot="label">产品经理:</label>
            <span class="spanFontClass">{{RecordForm.product}}</span>
          </el-form-item>
          <el-form-item>
            <label slot="label">原型作者:</label>
            <span class="spanFontClass">{{RecordForm.author}}</span>
          </el-form-item>
          <el-form-item label="开始日期">
            <span class="spanFontClass">{{RecordForm.startTime}}</span>
          </el-form-item>
          <el-form-item label="结束日期">
            <span class="spanFontClass">{{RecordForm.endTime}}</span>
          </el-form-item>
          <el-form-item label="描述">
            <label slot="label">描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述:</label>
            <span class="spanFontClass">{{RecordForm.describe}}</span>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    props: {
      RecordForm: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        text: '设计历程',
        isOpen: false,
        isMove: false,
        windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
        windowHeight: document.documentElement.clientHeight, //实时屏幕高度
      }
    },
    mounted() {
      var that = this;
      // <!--把window.onresize事件挂在到mounted函数上-->
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight;
          window.fullWidth = document.documentElement.clientWidth;
          that.windowHeight = window.fullHeight; // 高
          that.windowWidth = window.fullWidth; // 宽
        })()
      };
    },
    methods: {
      openBox() {
        console.log('双击')
        this.isOpen = true
      },
      mousedowm(e) { // 鼠标按下时的鼠标所在的X，Y坐标
        this.mouseDownX = e.pageX
        this.mouseDownY = e.pageY
        // 初始位置的X，Y 坐标
        // this.initX = obj.offsetLeft;
        // this.initY = obj.offsetTop;
        console.log('e', e)
        // 表示鼠标已按下
        this.flag = true
      },
      mousemove(e) {
        if (this.flag) {
          console.log('e :', e)
        }
      }
    },
    directives: {
      drag(el) {
        let oDiv = el // 当前元素
        // let self = this // 上下文
        // 禁止选择网页上的文字
        document.onselectstart = function () {
          return false
        }
        oDiv.onmousedown = function (e) {
          // 鼠标按下，计算当前元素距离可视区的距离
          let disX = e.clientX - oDiv.offsetLeft

          let disY = e.clientY - oDiv.offsetTop
          document.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离           
            let l = this.windowWidth
            let t = e.clientY - disY
            console.log(t, 'tt');
            if (t > 0 && t < 650) {
              // 移动当前元素
              oDiv.style.left = l + 'px'
              oDiv.style.top = t + 'px'
              console.log(document.getElementsByClassName('button-box')[0].style.top);
              document.getElementsByClassName('drawerClass')[0].style.top = document.getElementsByClassName(
                'button-box')[0].style.top

              console.log(document.getElementsByClassName('drawerClass')[0].style.top);

            }

          }
          document.onmouseup = function (e) {
            document.onmousemove = null
            document.onmouseup = null
          }
          // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
          return false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .RecordFormClass {
    .el-form-item {
      margin-bottom: 5px;

      .el-form-item__label {
        color: #0b3d50;
        font-weight: lighter;

      }

      .spanFontClass {
        color: #203744;
        display: flex;
        line-height: 30px;
      }
    }
  }

  .drawerClass {
    top: 50vh;
    right: 1px;
    height: 30%;

    box-shadow: 0
  }

  /deep/.demo-drawer {
    background: #83ccd2;
  }

  .button-box {
    width: 30px;
    height: 100px;
    border-radius: 50%;
    position: fixed;
    top: 45vh;
    right: 1px;
    padding-left: 15px;
    padding-top: 8px;
    cursor: pointer;
    opacity: 0.7;
    z-index: 888;

  }

  .btn-bg-img {
    width: 30px;
    height: 100px;
    /* background-image: url('../../../static/images/click.png'); */

    background-size: cover;
  }

  .button-box:hover {
    color: white;
    opacity: 1;
  }

  .font-box {
    width: 30px;
    height: 100px;
    border-radius: 3px;
    font: 12 "微软雅黑";
    color: black;
    background-color: #83ccd2;
    /*右侧中间定位*/
    top: 45vh;
    right: 1px;
    /*垂直水平居中*/
    text-align: center;
    line-height: 30px;
    -webkit-writing-mode: vertical-rl;
    writing-mode: vertical-rl;
    /* 鼠标移动到div变小手*/
    cursor: pointer;
    z-index: 9999;
  }
</style>
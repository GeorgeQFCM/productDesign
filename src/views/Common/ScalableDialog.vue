<template>
  <el-dialog v-mydialogDrag ref="xhzqDialog" class="xhzqDialog" :modal="false" :title="title" :fullscreen="isfullscreen" :visible.sync="dialogVisible" :append-to-body="true" :close-on-click-modal="false" :show-close="false" :width="width" :class="isminimize? 'isminimize': ''" center>
    <div v-show="!isminimize" slot="title" class="medium">
      <div></div>
      <div class="centers"><span>{{title}}</span></div>
      <div class="icons">
        <i class="fa fa-minus" style="font-size: 24px" @click="minimize"></i>
        <!-- <i :class="isfullscreen? 'fa fa-clone' : 'fa fa-square-o' " style="font-size: 24px" @click="IsFullscreen"></i> -->
        <i class="el-icon-close" style="font-size: 24px" @click="closeDialog"></i>
      </div>
    </div>
    <div v-show="isminimize" slot="title" class="horn">
      <div class="lefts"><span>{{title}}</span></div>
      <div class="centers"><i class="fa fa-square-o" style="font-size: 24px" @click="minimize"></i></div>
      <div class="rights"><i class="el-icon-close" style="font-size: 24px" @click="closeDialog"></i></div>
    </div>
    <div v-show="!isminimize" class="dialogBody">
      <slot>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </slot>
    </div>
    <div v-show="!isminimize" v-if="isFooter" class="dialogFooter">
      <slot name="footer" solt="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </slot>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    props: {
      width: {
        type: String,
        default: '70%'
      },
      title: {
        type: String,
        default: '测试对话框'
      },
      isFooter: { // 是否显示脚部
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        isfullscreen: false, // 全屏
        isminimize: false, // 最小化
        dialogVisible: false, // 隐藏弹窗
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      // 最小化
      minimize() {
        this.isminimize = !this.isminimize
        if (this.isfullscreen) this.isfullscreen = !this.isfullscreen
      },
      // 关闭弹窗
      closeDialog() {
        this.dialogVisible = false
      },
      // 打开弹窗
      openDialog() {
        this.dialogVisible = true
      },
      // 全屏
      IsFullscreen() {
        this.isfullscreen = !this.isfullscreen
        if (this.isfullscreen) this.$emit('isfullscreen')
      },
      onSubmit() {
      }
    },
    watch: {
      dialogVisible(val) {
        if (val) {
          const el = this.$refs.xhzqDialog.$el.querySelector('.el-dialog')
          el.style.left = 0
          el.style.top = 0
        }
      }
    },
    directives: {
      mydialogDrag: {
        bind(el, binding, vnode, oldVnode) {
          const dialogHeaderEl = el.querySelector('.el-dialog__header')
          const dragDom = el.querySelector('.el-dialog')
          dialogHeaderEl.style.cursor = 'move'
          // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
          const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)
          // const fixedX =
          // const fixedY =
          dialogHeaderEl.onmousedown = (e) => {
            // 判断当前是否为全屏状态
            const path = event.path || (event.composedPath && event.composedPath())
            const isFull = path.find(s => {
              if (s.className === undefined) {
                return false
              } else {
                return s.className.indexOf('is-fullscreen') > -1
              }
            })
            if (isFull !== undefined) {
              return
            }
            const isMinix = path.find(s => {
              if (s.className === undefined) {
                return false
              } else {
                return s.className.indexOf('isminimize') > -1
              }
            })
            if (isMinix !== undefined) {
              return
            }
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft
            const disY = e.clientY - dialogHeaderEl.offsetTop

            // 获取到的值带px 正则匹配替换
            let styL, styT

            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (sty.left.includes('%')) {
              styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
              styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
            } else {
              styL = +sty.left.replace('px', '')
              styT = +sty.top.replace('px', '')
            }

            document.onmousemove = function (e) {
              // 通过事件委托，计算移动的距离
              const l = e.clientX - disX
              const t = e.clientY - disY
              // 移动当前元素
              dragDom.style.left = `${l + styL}px`
              dragDom.style.top = `${t + styT}px`
              // const dom = e.path.find(s => s.querySelector('.el-dialog')).children[0]
              //
              // if (dom.offsetTop < 0) {
              //   dragDom.style.top = `0px`
              // }
              // if (dom.offsetLeft < 0) {
              //   dragDom.style.left = `0px`
              // }

              // 将此时的位置传出去
              // binding.value({x:e.pageX,y:e.pageY})
            }

            document.onmouseup = function (e) {
              const dragDom = el.querySelector('.el-dialog')
              const offsetLeft = dragDom.offsetLeft
              const offsetTop = dragDom.offsetTop
              const left = Number(dragDom.style.left.replace('px', ''))
              const top = Number(dragDom.style.top.replace('px', ''))
              const windowWidth = window.innerWidth
              const windowHeight = window.innerHeight - 50
              const offsetRight = offsetLeft + dragDom.offsetWidth - windowWidth
              const offsetBottom = offsetTop + dragDom.offsetHeight - windowHeight
              if (offsetLeft < 0) {
                dragDom.style.left = (left - offsetLeft) + 'px'
              }
              if (offsetTop < 0) {
                dragDom.style.top = (top - offsetTop) + 'px'
              }
              if (offsetRight > 0) {
                dragDom.style.left = (left - offsetRight) + 'px'
              }
              if (offsetBottom > 0) {
                dragDom.style.top = (top - offsetBottom) + 'px'
              }
              document.onmousemove = null
              document.onmouseup = null
            }
          }
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
// .el-dialog__wrapper {
//     position: absolute;
//     top: 20%;
//     right: 20%;
//     bottom: 20%;
//     left: 20%;
//     overflow: hidden;
//     margin: 0;
//     background: yellow;
// }

  /deep/.el-dialog {
    margin-top: 10vh !important;
  }

  .no_select {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Chrome/Safari/Opera */
    -khtml-user-select: none;
    /* Konqueror */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently */
  }

  .isminimize {
    right: 20px;
    bottom: 20px;
    top: auto;
    left: auto;
    overflow: hidden;

    /deep/.el-dialog {
      margin: 0 !important;
      width: 240px !important;
      height: 40px;
      top: 0 !important;
      right: 0 !important;
    }

    /deep/.el-dialog__header {
      cursor: auto !important;

      /deep/.el-dialog__headerbtn {
        display: none;
      }
    }

    .dialogFooter {
      position: absolute;
      bottom: 0;

    }
  }

  .xhzqDialog {
    .is-fullscreen {
      width: 100% !important;
      left: 0 !important;
      top: 0 !important;
      margin-top: 0 !important;
      overflow: hidden;
      position: relative;

      /deep/.el-dialog__header {
        cursor: auto !important;
      }

      /deep/.el-dialog__body {
        height: 100%;

        .dialogBody {
          height: 100% !important;
          max-height: none !important;
          padding-bottom: 120px !important;
        }
      }

      .dialogFooter {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: #fff;
      }
    }

    /deep/ .el-dialog {
      .el-dialog__header {
        width: 100%;
        padding: 5px 20px 5px !important;
        display: flex;
        border-bottom: 1px solid #ccc;
        @extend .no_select;
        cursor: auto;

        .medium {
          width: 100%;
          height: 100%;
          display: flex;

          div {
            flex: 1;
          }

          .centers {
            span {
              text-align: center;
              font-size: 16px;
              color: #606266;
            }
          }

          .icons {
            display: flex;
            justify-content: flex-end;

            i {
              color: #5f6368;
              font-size: 18px !important;
              display: block;
              padding: 0 7px;
            }

            i:hover {
              background: #dcdfe6;
              cursor: pointer;
            }

            .el-icon-close:hover {
              background: #f00;
              color: #fff;
            }
          }
        }

        .horn {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;

          div {
            i {
              color: #5f6368;
              font-size: 20px !important;
            }
          }

          .lefts {
            flex: 4;
            margin-top: 3px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            span {
              font-size: 16px;
              color: #606266;
            }
          }

          .centers {
            flex: 1;
          }

          .rights {
            flex: 1;
          }

          i:hover {
            cursor: pointer;
            color: #000;
          }
        }

        /deep/ .el-dialog__headerbtn {
          top: 0;
          font-size: 24px;
        }
      }

      /deep/.el-dialog__body {
        padding: 1px !important;

        .dialogBody {
          max-height: calc(80vh - 50px);
          box-shadow: inset 0px -2px 10px 1px #b0b3b2;
          overflow: auto;
          padding: 20px 25px 20px;
          background: #f7f9fc;

          &::-webkit-scrollbar {
            width: 4px;
            height: 8px;
          }

          &::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 4px;
          }

          &:hover::-webkit-scrollbar-thumb {
            background: hsla(0, 0%, 53%, .4)
          }

          &:hover::-webkit-scrollbar-track {
            background: hsla(0, 0%, 53%, .1)
          }
        }

        .dialogFooter {
          padding: 10px 15px;
          border-top: 1px solid #ccc;
          text-align: right;

          .el-button {
            padding: 7px 15px;
          }
        }
      }
    }

    .xhzqDialog {

      // display: flex;
      // justify-content: center;
      .el-select {
        width: 100%;
      }

      .el-date-editor {
        width: 100%;
      }
    }
  }
</style>
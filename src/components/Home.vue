<template>
  <div class="app-Layout">

    <el-container class="home-comtainer">

      <el-aside :width="isCollapse ? '64px' : '230px'" class="home-sider">
        <div class="siderBox">
          <div class="siderTitle">
            <svg-icon icon-class='backstage' className="backstage-icon" />
            <span>金畅信息化产品原型演示平台</span>
          </div>
          <div class="siderMain">
            <!-- #4c8dae  #84b9cb -->
            <el-menu class="siderMenu" background-color="#507ea4" text-color="#fff" active-text-color="#ffd04b"
              unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activeMenu"
              mode="vertical">
              <MenuItem v-for="route in common_routes" :key="route.name" :item="route" :base-path="route.path">
              </MenuItem>
            </el-menu>
          </div>
        </div>
      </el-aside>
      
      <el-container class="main">
        <el-header class="home-header" height='50px'>
          <div class="headerBox">
            <div class="headersLeft">
              <div class="leftBox" @click="toggleCollapse" :class="toggleActive ? 'toggleLeftBox' : ''">
                <svg-icon icon-class='fold' className="fold-icon" />
              </div>
              <!-- 面包屑 -->
              <BreadCrumb />
            </div>

            <HeaderRight />
          </div>
        </el-header>

        <el-main class="home-main">
          <TagsViews />
          <!-- 路由占位符 -->
          <div class="main-views">
            <!-- <router-view v-slot="{ Component }">
              <transition name="move" mode="out-in">
                <keep-alive :include="tagList">
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view> -->
            <transition name="move" mode="out-in">
              <router-view />
            </transition>
          </div>

        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import TagsViews from './TagsViews/TagsViews'
  import HeaderRight from './headerRight/headerRight'
  import MenuItem from './MenuItem/menuItem'
  import BreadCrumb from './BreadCrumb/BreadCrumb'
  export default {
    components: {
      BreadCrumb,
      MenuItem,
      HeaderRight,
      TagsViews
    },
    computed: {
      ...mapGetters(["common_routes", "tagList"]),
      activeMenu() {
        const route = this.$route;
        const {
          meta,
          path,
          name
        } = route;
        if (meta.activeMenu) {
          return meta.activeMenu;
        }
        return name;
      },
    },
    data() {
      return {
        toggleActive: false,
        menulist: [],
        isCollapse: false,
        // 被激活的链接地址
        menulist: [],
      }
    },
    created() {
      // console.log(this.common_routes, "this.common_routes");
    },
    methods: {

      // 点击按钮 切换菜单折叠
      toggleCollapse() {
        this.toggleActive = !this.toggleActive
        this.isCollapse = !this.isCollapse
      }
    },
  }
</script>

<style lang="less" scoped>
  //去掉下划线
  /deep/.router-link-active {
    text-decoration: none !important;
  }

  .app-Layout {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .home-comtainer {
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: all 1s;
  }

  .home-sider {
    // background-image: linear-gradient(#182a3d, #001529);
    height: 100%;
    transition: width .3s;
    background: linear-gradient(288deg, #FFB6B9 0%, #FFB6B9 35%, #FAE3D9 calc(35% + 1px), #FAE3D9 45%, #BBDED6 calc(45% + 1px), #BBDED6 65%, #61C0BF calc(65% + 1px), #61C0BF 100%);

    .siderBox {
      width: 100%;
      height: 100%;
    }


    .siderTitle {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #dcdfe6;
      color: #ffffff;
      box-sizing: border-box;
      text-align: left;
      line-height: 50px;
      font-size: 13px;
      overflow: hidden;

      .backstage-icon {
        fill: #3E64FF;
        margin: 0 10px 0 25px;
      }
    }

    .siderMain {
      width: 100%;
      //height: calc(100% - 64px);  
      height: calc(100% - 50px);
      overflow-x: hidden;
      overflow-y: auto;
      //background-color: #44617b ;
      // background: radial-gradient(100% 225% at 100% 0%, #FF0000 0%, #000000 100%), linear-gradient(236deg, #00C2FF 0%, #000000 100%), linear-gradient(135deg, #CDFFEB 0%, #CDFFEB 36%, #009F9D 36%, #009F9D 60%, #07456F 60%, #07456F 67%, #0F0A3C 67%, #0F0A3C 100%);
      // background-blend-mode: overlay, hard-light, normal;


    }

    .siderMenu {
      width: 100%;
      height: 100%;



    }
  }


  .home-header {
    background: linear-gradient(125deg, #ECFCFF 0%, #ECFCFF 40%, #B2FCFF calc(40% + 1px), #B2FCFF 60%, #5EDFFF calc(60% + 1px), #5EDFFF 72%, #3E64FF calc(72% + 1px), #3E64FF 100%);
    
    // background-image: linear-gradient(to right, #ffffff, #ffffff);
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #dcdfe6;

    .headerBox {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
    }

    .headersLeft {
      display: flex;
      justify-content: flex-start;
    }

    .leftBox {
      transition: all 0.5s;
      transform-origin: center center;
      line-height: 50px;
      width: 20px;
      height: 100%;
      margin-right: 15px;
    }

    .toggleLeftBox {
      transform: rotate(180deg);
    }

    .fold-icon {
      transition: all 0.5s;
      transform-origin: center center;
      width: 20px;
      height: 100%;
      margin-right: 15px;
    }
  }

  .main {
    width: 100%;
    height: 100%;
    overflow: hidden !important;
  }

  .el-menu-item.is-active {
    background-color: rgb(37 206 204);
  }

  .home-main {
    width: 100%;
    height: 100%;
    // background-color: #eaedf1;
    padding: 0px !important;
  }

  .main-views {
    padding: 10px 10px 0 10px;
    width: 100%;
    box-sizing: border-box;
    height: calc(100% - 35px);
    overflow-x: hidden;
    overflow-y: auto;
    -ms-overflow-style: none;
    overflow: '-moz-scrollbars-none';
    scrollbar-width: none;
    /*  火狐   */
    background: #F5F7F9;
    // background-image: linear-gradient(to right, #ffffff, #ffffff)
  }

  .iconfont {
    margin-right: 10px;
  }

  .move-enter,
  .move-leave-to {
    transform: scale(0.9);
    opacity: 0;
  }

  .move-enter-to,
  .move-leave {
    transform: scale(1);
    opacity: 1;
  }

  .move-enter-active,
  .move-leave-active {
    transition: all 0.5s;
  }
</style>
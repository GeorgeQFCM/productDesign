/*
 * @Description: 
 * @Date: 2021-05-07 19:32:33
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {

  return originalPush.call(this, location).catch(err => err)

}

export const constRouter = [{
    path: '/login',
    component: () => import('@/components/Login'),
    hidden: true //导航菜单忽略选项
  },
  {
    path: '/',
    component: Home,
    redirect: '/welcome',
    hidden: true,
  },
  //#region 
  // {
  //   path: '/',
  //   component: Home,
  //   name: 'home',
  //   meta: {
  //     title: "首页", //导航菜单项标题
  //     icon: 'el-icon-s-home' //导航菜单图标
  //   },
  //   children: [{
  //     path: '/welcome',
  //     component: () => import('@/components/Welcome.vue'),
  //     name: 'welcome',
  //     meta: {
  //       title: "欢迎页",
  //       icon: 'el-icon-s-home',
  //     }
  //   }]
  // }
  //#endregion
]

export const dynamicRoutes = [{
    path: '/',
    component: Home,
    name: 'home',
    meta: {
      title: "首页",
      icon: 'el-icon-s-home'
    },
    children: [{
      path: '/welcome',
      component: () => import('@/components/Welcome.vue'),
      name: 'welcome',
      meta: {
        title: "欢迎页",
        icon: 'el-icon-s-home',
      }
    }]
  },
  {
    path: '/',
    component: Home,
    name: 'ChinaTaiwanBusiness',
    meta: {
      title: "中台业务",
      icon: 'el-icon-menu'
    },
    children: [{
        path: '/Brand',
        component: () => import('@/views/ChinaTaiwanBusiness/BrandBusiness/BrandParent'),
        name: 'Brand',
        meta: {
          title: "品牌业务",
          icon: 'el-icon-s-goods',
        },
        children: [{
            path: '/Brand/TrademarkRegistration',
            component: () => import('@/views/ChinaTaiwanBusiness/BrandBusiness/TrademarkRegistration'),
            name: 'TrademarkRegistration',
            meta: {
              title: "商标管理",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/Brand/TrademarkCertificate',
            component: () => import('@/views/ChinaTaiwanBusiness/BrandBusiness/TrademarkCertificate'),
            name: 'TrademarkCertificate',
            meta: {
              title: "商标证书管理",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/Brand/BrandManagement',
            component: () => import('@/views/ChinaTaiwanBusiness/BrandBusiness/BrandManagement'),
            name: 'BrandManagement',
            meta: {
              title: "品牌管理",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
        ]
      },
      {
        path: '/CopywritingPicture',
        component: () => import('@/views/ChinaTaiwanBusiness/BrandBusiness/BrandParent'),
        name: 'CopywritingPicture',
        meta: {
          title: "文案图片",
          icon: 'el-icon-s-goods',
          hidden: false,
        },
        children: [{
            path: '/CopywritingPicture/EmergencyImage',
            component: () => import('@/views/ChinaTaiwanBusiness/CopywritingPicture/EmergencyImage'),
            name: 'EmergencyImage',
            meta: {
              title: "应急图管理",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/CopywritingPicture/EmergencyImage1',
            component: () => import('@/views/ChinaTaiwanBusiness/CopywritingPicture/EmergencyImage'),
            name: 'EmergencyImage1',
            meta: {
              title: "应急图1",
              icon: 'el-icon-circle-check',
              hidden: true,
            }
          },
        ]
      }
    ]
  },
  {
    path: '/',
    component: Home,
    name: 'SupplyChainBusiness',
    meta: {
      title: "供应链业务",
      icon: 'el-icon-truck',
    },
    children: [{
        path: '/Stock',
        component: () => import('@/views/SupplyChainBusiness/stock/StockParent'),
        name: 'Stock',
        meta: {
          title: "备货业务",
          icon: 'el-icon-s-goods',
        },
        children: [{
            path: '/Stock/DailyStockAllVersions',
            component: () => import('@/views/SupplyChainBusiness/stock/DailyStockAllVersions'),
            name: 'DailyStockAllVersions',
            meta: {
              title: "日常备货",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/Stock/DaliyStock',
            component: () => import('@/views/SupplyChainBusiness/stock/DaliyStock'),
            name: 'DaliyStock',
            meta: {
              title: "日常备货v1",
              icon: 'el-icon-s-goods',
              hidden: true,
            }
          },
          {
            path: '/Stock/DalitStockv2',
            component: () => import('@/views/SupplyChainBusiness/stock/DalitStockv2'),
            name: 'DalitStockv2',
            meta: {
              title: "日常备货v2",
              icon: 'el-icon-s-goods',
              hidden: true,
            }
          },
          {
            path: '/Stock/DalitStockv3',
            component: () => import('@/views/SupplyChainBusiness/stock/DalitStockv3'),
            name: 'DalitStockv3',
            meta: {
              title: "日常备货v3",
              icon: 'el-icon-s-goods',
              hidden: true,
            }
          },
          {
            path: '/Stock/DailyStockV4',
            component: () => import('@/views/SupplyChainBusiness/stock/DailyStockV4'),
            name: 'DailyStockV4',
            meta: {
              title: "日常备货V4",
              icon: 'el-icon-circle-check',
              hidden: true,
            }
          },
          {
            path: '/Stock/salesAlertAllVersions',
            component: () => import('@/views/SupplyChainBusiness/stock/salesAlertAllVersions'),
            name: 'salesAlertAllVersions',
            meta: {
              title: "销售预警",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/Stock/SalesAlert',
            component: () => import('@/views/SupplyChainBusiness/stock/SalesAlert'),
            name: 'SalesAlert',
            meta: {
              title: "销售预警V1",
              icon: 'el-icon-circle-close',
              hidden: true,
            }
          },
          {
            path: '/Stock/SalesAlertV2',
            component: () => import('@/views/SupplyChainBusiness/stock/SalesAlertV2'),
            name: 'SalesAlertV2',
            meta: {
              title: "销售预警V2",
              icon: 'el-icon-circle-check',
              hidden: true,
            }
          },
          {
            path: '/Stock/SpecialStock',
            component: () => import('@/views/SupplyChainBusiness/stock/SpecialStock'),
            name: 'SpecialStock',
            meta: {
              title: "特殊备货",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },

          {
            path: '/Stock/plandePartmentApproved',
            component: () => import('@/views/SupplyChainBusiness/stock/plandePartmentApproved'),
            name: 'plandePartmentApproved',
            meta: {
              title: "计划部审批",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/Stock/PurchaseApplicationRecord',
            component: () => import('@/views/SupplyChainBusiness/stock/PurchaseApplicationRecord'),
            name: 'PurchaseApplicationRecord',
            meta: {
              title: "采购申请记录",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/Stock/PurchaseOrderTracking',
            component: () => import('@/views/SupplyChainBusiness/stock/PurchaseOrderTracking'),
            name: 'PurchaseOrderTracking',
            meta: {
              title: "采购订单跟踪",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/Stock/ApplicationBehaviorAnalys',
            component: () => import('@/views/SupplyChainBusiness/stock/ApplicationBehaviorAnalys'),
            name: 'ApplicationBehaviorAnalys',
            meta: {
              title: "申请行为分析",
              icon: 'el-icon-s-goods',
              hidden: false,
            }
          },
          {
            path: '/Stock/DailyStockBehaviorAnalysis',
            component: () => import('@/views/SupplyChainBusiness/stock/DailyStockBehaviorAnalysis'),
            name: 'DailyStockBehaviorAnalysis',
            meta: {
              title: "日常备货行为分析",
              icon: 'el-icon-s-goods',
              hidden: false,
            }
          },
          {
            path: '/Stock/MaterialApplicationAnalysis',
            component: () => import('@/views/SupplyChainBusiness/stock/MaterialApplicationAnalysis'),
            name: 'MaterialApplicationAnalysis',
            meta: {
              title: "物料采购申请分析",
              icon: 'el-icon-s-goods',
              hidden: false,
            }
          },
          {
            path: '/Stock/MaterialSupplyBill',
            component: () => import('@/views/SupplyChainBusiness/stock/MaterialSupplyBill'),
            name: 'MaterialSupplyBill',
            meta: {
              title: "物料供应账单",
              icon: 'el-icon-s-goods',
              hidden: false,
            }
          },
          {
            path: '/Stock/MaterialTransportationModeAllVersions',
            component: () => import('@/views/SupplyChainBusiness/stock/MaterialTransportationModeAllVersions'),
            name: 'MaterialTransportationModeAllVersions',
            meta: {
              title: "物料运输方式设置",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/Stock/MaterialTransportationMode',
            component: () => import('@/views/SupplyChainBusiness/stock/MaterialTransportationMode'),
            name: 'MaterialTransportationMode',
            meta: {
              title: "物料运输方式设置V1",
              icon: 'el-icon-circle-check',
              hidden: true,
            }
          },
          {
            path: '/Stock/MaterialTransportationModeV2',
            component: () => import('@/views/SupplyChainBusiness/stock/MaterialTransportationModeV2'),
            name: 'MaterialTransportationModeV2',
            meta: {
              title: "物料运输方式设置V2",
              icon: 'el-icon-circle-check',
              hidden: true,
            }
          },
          {
            path: '/Stock/ProductLineSetup',
            component: () => import('@/views/SupplyChainBusiness/stock/ProductLineSetup'),
            name: 'ProductLineSetup',
            meta: {
              title: "产品线分配设置",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/Stock/TimeParameterSetting',
            component: () => import('@/views/SupplyChainBusiness/stock/TimeParameterSetting'),
            name: 'TimeParameterSetting',
            meta: {
              title: "备货参数设置",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/Stock/LogDay',
            component: () => import('@/views/SupplyChainBusiness/stock/LogDay'),
            name: 'LogDay',
            meta: {
              title: "物流天数设置",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/Stock/LifeCycleParameterRule',
            component: () => import('@/views/SupplyChainBusiness/stock/LifeCycleParameterRule'),
            name: 'LifeCycleParameterRule',
            meta: {
              title: "生命周期参数设置",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/Stock/SeasonCoefficient',
            component: () => import('@/views/SupplyChainBusiness/stock/SeasonCoefficient'),
            name: 'SeasonCoefficient',
            meta: {
              title: "季节系数设置",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/Stock/BlackList',
            component: () => import('@/views/SupplyChainBusiness/stock/BlackList'),
            name: 'BlackList',
            meta: {
              title: "黑名单设置",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/Stock/DailyStockApproval',
            component: () => import('@/views/SupplyChainBusiness/stock/DailyStockApproval'),
            name: 'DailyStockApproval',
            meta: {
              title: "日常备货审批",
              icon: 'el-icon-circle-close',
              hidden: false,
            }
          },
          {
            path: '/Stock/EmergencyStock',
            component: () => import('@/views/SupplyChainBusiness/stock/EmergencyStock'),
            name: 'EmergencyStock',
            meta: {
              title: "紧急备货",
              icon: 'el-icon-circle-close',
              hidden: false,
            }
          },

          {
            path: '/Stock/ProjectStock',
            component: () => import('@/views/SupplyChainBusiness/stock/ProjectStock'),
            name: 'ProjectStock',
            meta: {
              title: "项目备货",
              icon: 'el-icon-circle-close',
              hidden: false,
            }
          },
          {
            path: '/Stock/EmergencyStockApproval',
            component: () => import('@/views/SupplyChainBusiness/stock/EmergencyStockApproval'),
            name: 'EmergencyStockApproval',
            meta: {
              title: "特殊备货审批",
              icon: 'el-icon-circle-close',
              hidden: false,
            }
          },
        ]
      },
      {
        path: '/financial',
        component: () => import('@/views/SupplyChainBusiness/stock/StockParent'),
        name: 'personalManage',
        meta: {
          title: "财务业务",
          icon: 'el-icon-s-finance',
          hidden: false,
        },
        children: [{
            path: '/financial/IncomeRecord',
            component: () => import('@/views/SupplyChainBusiness/Finance/IncomeRecord'),
            name: 'IncomeRecord',
            meta: {
              title: "收入记录表",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          },
          {
            path: '/financial/CollectionProcessing',
            component: () => import('@/views/SupplyChainBusiness/Finance/CollectionProcessing'),
            name: 'CollectionProcessing',
            meta: {
              title: "回款确认办理",
              icon: 'el-icon-circle-check',
              hidden: false,
            }
          }
        ]
      },
    ]
  },





  //#region 
  // {
  //   path: '/',
  //   component: Home,
  //   name: "system",
  //   meta: {
  //     title: "系统管理",
  //     icon: 'el-icon-setting',
  //     hidden: false
  //   },
  //   children: [{
  //       path: '/personalManage',
  //       component: () => import('@/views/System/PersonalManage.vue'),
  //       name: 'personalManage',
  //       meta: {
  //         title: "个人管理",
  //         icon: 'el-icon-s-custom',
  //         hidden: false,
  //       }
  //     },
  //     {
  //       path: '/accountManage',
  //       component: () => import('@/views/System/AccountManage.vue'),
  //       name: 'accountManage',
  //       meta: {
  //         title: "账号管理",
  //         icon: 'el-icon-s-opportunity',
  //         hidden: false,
  //       }
  //     },
  //   ]
  // },
  // {
  //   path: '/',
  //   component: Home,
  //   name: "user",
  //   meta: {
  //     title: "用户列表",
  //     icon: 'el-icon-user',
  //     hidden: false
  //   },
  //   children: [{
  //       path: '/userlist',
  //       component: () => import('@/views/User/userList.vue'),
  //       name: 'userlist',
  //       meta: {
  //         title: "用户列表",
  //         icon: 'el-icon-user',
  //         hidden: false,
  //       }
  //     },
  //     {
  //       path: '/skilllist',
  //       component: () => import('@/views/User/skillList.vue'),
  //       name: 'skilllist',
  //       meta: {
  //         title: "技能列表",
  //         icon: 'el-icon-scissors',
  //         hidden: false,
  //       }
  //     },
  //   ]
  // },
  // {
  //   path: '/',
  //   component: Home,
  //   name: "component",
  //   meta: {
  //     title: "组件使用",
  //     icon: 'el-icon-coin',
  //     hidden: false
  //   },
  //   children: [{
  //       path: '/dragDialog',
  //       component: () => import('@/views/Component/dragDialog.vue'),
  //       name: 'dragDialog',
  //       meta: {
  //         title: "拖拽组件",
  //         icon: 'el-icon-s-promotion',
  //         hidden: false,
  //       }
  //     },
  //     {
  //       path: '/lazyImage',
  //       component: () => import('@/views/Component/lazyImage.vue'),
  //       name: 'lazyImage',
  //       meta: {
  //         title: "懒加载图片",
  //         icon: 'el-icon-picture-outline',
  //         hidden: false,
  //       }
  //     },
  //     {
  //       path: '/richEdit',
  //       component: () => import('@/views/Editor/RichEdit.vue'),
  //       name: 'richEdit',
  //       meta: {
  //         title: "富文本编辑",
  //         icon: 'el-icon-s-order',
  //         hidden: false,
  //       }
  //     },
  //     {
  //       path: '/markdownEdit',
  //       component: () => import('@/views/Editor/MarkdownEdit.vue'),
  //       name: 'markdownEdit',
  //       meta: {
  //         title: "Markdown编辑",
  //         icon: 'el-icon-s-cooperation',
  //         hidden: false,
  //       }
  //     },
  //     {
  //       path: '/upload',
  //       component: () => import('@/views/File/Upload.vue'),
  //       name: 'upload',
  //       meta: {
  //         title: "文件上传",
  //         icon: 'el-icon-upload2',
  //         hidden: false,
  //       }
  //     },
  //     {
  //       path: '/download',
  //       component: () => import('@/views/File/Download.vue'),
  //       name: 'download',
  //       meta: {
  //         title: "文件下载",
  //         icon: 'el-icon-download',
  //         hidden: false,
  //       }
  //     },
  //     {
  //       path: '/tab',
  //       component: () => import('@/views/Tabs/tab.vue'),
  //       name: 'tab',
  //       meta: {
  //         title: "tab选项卡",
  //         icon: 'el-icon-star-off',
  //         hidden: false,
  //       }
  //     },
  //     {
  //       path: '/lineChart',
  //       component: () => import('@/views/Chart/LineChart.vue'),
  //       name: 'lineChart',
  //       meta: {
  //         title: "折线图",
  //         icon: 'el-icon-ice-cream-square',
  //         hidden: false,
  //       }
  //     },
  //     {
  //       path: '/pieChart',
  //       component: () => import('@/views/Chart/PieChart.vue'),
  //       name: 'pieChart',
  //       meta: {
  //         title: "饼图",
  //         icon: 'el-icon-lollipop',
  //         hidden: false,
  //       }
  //     },
  //   ]
  // },
  // {
  //   path: '/',
  //   component: Home,
  //   name: "menuList",
  //   meta: {
  //     title: "页面风格",
  //     icon: 'el-icon-menu',
  //     hidden: false
  //   },
  //   children: [{
  //       path: '/emojiMenu',
  //       component: () => import('@/views/MenuList/EmojiMenu.vue'),
  //       name: 'emojiMenu',
  //       meta: {
  //         title: "表情菜单",
  //         icon: 'el-icon-goblet-square-full',
  //         hidden: false,
  //       }
  //     },
  //     {
  //       path: '/iconMenu',
  //       component: () => import('@/views/MenuList/IconMenu.vue'),
  //       name: 'iconMenu',
  //       meta: {
  //         title: "图标菜单",
  //         icon: 'el-icon-bicycle',
  //         hidden: false,
  //       }
  //     },

  //   ]
  // },
  //#endregion



]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constRouter
})




export default router
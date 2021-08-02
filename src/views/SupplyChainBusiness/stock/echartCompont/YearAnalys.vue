<template>
  <div id="NewArrivals" style="width: 118%;height:400px;margin-left:-100px" v-loading="NewArrivalsLoading"
    element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"></div>
</template>

<script>
  //生成从minNum到maxNum的随机数
  function randomNum(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  }
  //import echarts from "echarts";
  import * as echarts from 'echarts'; //新版导入
  export default {
    data() {
      return {
        ClassList: [],
        applyCount: null,
        purchaseCount: null,
        deliverCount: null,
        saleCount: null,
        NewArrivalsLoading: false

      }
    },
    methods: {
      getPage(obj, val) {
        switch (obj.Mold) {
          case '周':
            this.ClassList = ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周',
              '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周', '第22周', '第23周', '第24周', '第25周',
              '第26周', '第27周', '第28周', '第29周', '第30周', '第31周', '第32周', '第33周', '第34周', '第35周', '第36周', '第37周', '第38周',
              '第39周', '第40周', '第41周', '第42周', '第43周', '第44周', '第45周', '第46周', '第47周', '第48周', '第49周', '第50周', '第51周',
              '第52周'
            ];
            this.applyCount = new Array(52).fill(0)
            this.purchaseCount = new Array(52).fill(0)
            this.deliverCount = new Array(52).fill(0)
            this.saleCount = new Array(52).fill(0)

            break;
          case '季度':
            this.ClassList = ['第一季度', '第二季度', '第三季度', '第四季度']
            this.applyCount = new Array(4).fill(0)
            this.purchaseCount = new Array(4).fill(0)
            this.deliverCount = new Array(4).fill(0)
            this.saleCount = new Array(4).fill(0)
            break;
          default:
            this.ClassList = ['一月份', '二月份', '三月份', '四月份', '五月份', '六月份', '七月份', '八月份', '九月份', '十月份', '十一月份', '十二月份']
            this.applyCount = new Array(12).fill(0)
            this.purchaseCount = new Array(12).fill(0)
            this.deliverCount = new Array(12).fill(0)
            this.saleCount = new Array(12).fill(0)
            break;
        }
        if (val == 'default') {
          for (let i = 0; i < this.applyCount.length; i++) {
            this.applyCount[i] = randomNum(400, 500)
            this.purchaseCount[i] = randomNum(200, 450)
            this.deliverCount[i] = randomNum(200, 400)
            this.saleCount[i] = randomNum(100, 300)
          }
        } else {
          for (let i = 0; i < this.applyCount.length; i++) {
            this.applyCount[i] = randomNum(40, 50)
            this.purchaseCount[i] = randomNum(20, 40)
            this.deliverCount[i] = randomNum(20, 40)
            this.saleCount[i] = randomNum(10, 30)
          }
        }
        this.initChart()
      },

      initChart() {
        var myChart = echarts.init(
          document.getElementById("NewArrivals"),
          "light"
        );
        myChart.setOption({
          title: {
            text: '',
            textStyle: {
              fontSize: 14
            },
            textAlign: 'auto'


          },
          toolbox: {
            left:200,
            feature: {
             
              magicType: {
                show: true,
                type: ['line', 'bar']
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          legend: {
            data: ['申请数量', '采购数量', '发货数量', '销售数量'],
            bottom: '0px'
          },
          xAxis: [{
            type: 'category',
            data: this.ClassList,
            axisPointer: {
              type: 'shadow'
            }
          }],
          yAxis: [{
              type: 'value',
              name: '数量',
              min: 0,
              max: Math.max.apply(null, this.applyCount),

              axisLabel: {
                formatter: '{value}'
              }
            },
            // {
            //   type: 'value',
            //   name: '比例',
            //   min: 0,
            //   max: 100,
            //   interval: 10,
            //   axisLabel: {
            //     formatter: '{value} %'
            //   }
            // }
          ],
          series: [{
              name: '申请数量',
              type: 'bar',
              data: this.applyCount,
            },
            {
              name: '采购数量',
              type: 'bar',
              data: this.purchaseCount
            },
            {
              name: '发货数量',
              type: 'bar',
              data: this.deliverCount,
            },
            {
              name: '销售数量',
              type: 'bar',
              data: this.saleCount
            },

          ]
        });
      }
    }

  }

</script>

<style>

</style>

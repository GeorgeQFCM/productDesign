<template>
  <div id="YearbyYearAnalys" style="width: 118%;height:500px;margin-left:-100px" v-loading="YearbyYearAnalysLoading"
    element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"></div>
</template>

<script>
  import echarts from "echarts";
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
  export default {
    data() {
      return {
        YearbyYearAnalysLoading: false,
        ClassList: [],
        applyCount: null,
        purchaseCount: null,
        deliverCount: null,
        saleCount: null,
        allYearCount: null
      }

    },
    methods: {
      getPage() {
        this.ClassList=[]
        for (let year = 2010; year <= 2021; year++) {
          this.ClassList.push(year)
        }
        this.applyCount = []
        this.purchaseCount = []
        this.deliverCount = []
        this.saleCount = []
        for (let i = 0; i < this.ClassList.length; i++) {
          this.applyCount[i] = randomNum(4000, 5000)
          this.purchaseCount[i] = randomNum(2000, 4500)
          this.deliverCount[i] = randomNum(2000, 4000)
          this.saleCount[i] = randomNum(1000, 3000)
        }

        this.allYearCount = {
          "申请数量": 23365,
          "采购数量": 14079,
          "发货数量": 16929,
          "销售数量": 14890
        }
        this.initChart()
      },
      initChart() {
        let _this = this
        var myChart = echarts.init(
          document.getElementById("YearbyYearAnalys"),

        );
        myChart.setOption({
          title: [{
            text: '合计分析',
            textStyle: {
              fontSize: 14
            },
            textAlign: 'auto'
          },],
          grid: {
            top: 40,
            bottom: 40,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                label: {
                  show: true,
                  //formatter: '{a} <br/>{b} : {c} ({d}%)' //显示比例
                  formatter: function (params) {
                     return params.value;
                   }
                }
              }
            }
          },
          tooltip: {

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
            max: Math.max.apply(null, this.applyCount) + 2200,

            axisLabel: {
              formatter: '{value}'
            }
          }, ],
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
            {
              type: 'pie',
              radius: [0, '30%'],
              center: ['50%', '20%'],
              z: 9999,
              top:0,              
              data: Object.keys(this.allYearCount).map(function (key) {
                return {
                  name: key,
                  value: _this.allYearCount[key]
                };
              }),
               label:{
                 show:true,                 
                 formatter: '{b} : {c}' 
               }

            },

          ]
        });
      }
    }
  }

</script>

<style>

</style>

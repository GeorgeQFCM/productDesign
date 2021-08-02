<template>
  <div id="LTPlatform" style="width: 400px;height:300px;"></div>
</template>

<script>
  //import echarts from 'echarts' //echart
  import * as echarts from 'echarts'; //新版导入
  export default {
    methods: {
      initChart() {
        let myChart = echarts.init(document.getElementById('LTPlatform'));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '乐天平台区域申请统计',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)' //显示比例
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [{
            itemStyle: {
              borderRadius: 5
            },
            
            name: '申请数量',
            type: 'pie',
            radius: '50%',
            data: [{
                value: 1048,
                name: '北美'
              },
              {
                value: 735,
                name: '欧洲'
              },
              {
                value: 580,
                name: '中东'
              },
              {
                value: 484,
                name: '印度'
              },
              {
                value: 500,
                name: '新加坡'
              },
            
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              label: {
                show: true
              }
            }
          }]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
    },
    mounted() {
      this.initChart()

    }

  }

</script>

<style>

</style>

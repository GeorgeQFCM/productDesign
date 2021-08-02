<template>
  <div id="ProjectReasons" style="width: 300px;height:350px;"></div>
</template>

<script>
  //import echarts from 'echarts' //echart
  import * as echarts from 'echarts'; //新版导入
  export default {
    methods: {
      initChart() {       
        let myChart = echarts.init(document.getElementById('ProjectReasons'));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '项目备货原因分析',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)' //显示比例
          },
          legend: {
             orient: 'horizontal',         
            bottom: 0
          },
          series: [{
            itemStyle: {
              borderRadius: 5
            },
            
            name: '原因数量',
            type: 'pie',
            radius: '50%',
            data: [{
                value: 448,
                name: '原因A'
              },
              {
                value: 235,
                name: '原因B'
              },
              {
                value: 680,
                name: '原因C'
              },
              {
                value: 284,
                name: '原因D'
              },
              {
                value: 900,
                name: '无原因'
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

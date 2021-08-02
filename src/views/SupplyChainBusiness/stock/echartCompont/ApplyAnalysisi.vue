<template>
  <div id="ApplyChar" style="width: 700px;height:350px;"></div>
</template>

<script>
  //import echarts from 'echarts' //旧版导入
  import * as echarts from 'echarts'; //新版导入
  export default {
    methods: {
      initChart() {       
        let myChart = echarts.init(document.getElementById('ApplyChar'));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '申请方式分析',
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
            
            name: '数量',
            type: 'pie',
            radius: '50%',
            data: [{
                value: 1048,
                name: '日常备货'
              },
              {
                value: 735,
                name: '紧急备货'
              },
              {
                value: 580,
                name: '项目备货'
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

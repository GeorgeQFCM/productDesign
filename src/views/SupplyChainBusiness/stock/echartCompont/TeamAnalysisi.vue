<template>
  <div id="teamChar" style="width: 700px;height:350px;"></div>
</template>

<script>
  //import echarts from 'echarts' //echart
  import * as echarts from 'echarts'; //新版导入
  export default {
    methods: {
      initChart() {       
        let myChart = echarts.init(document.getElementById('teamChar'));
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: 'Team申请统计',
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
                name: 'Team1'
              },
              {
                value: 735,
                name: 'Team2'
              },
              {
                value: 580,
                name: 'Team3'
              },
              {
                value: 484,
                name: 'Team4'
              },
              {
                value: 500,
                name: 'Team5'
              },
              {
                value: 300,
                name: 'Team6'
              },
              {
                value: 300,
                name: 'Team7'
              },
              {
                value: 300,
                name: 'Team8'
              },
              {
                value: 300,
                name: 'Team9'
              },
              {
                value: 300,
                name: 'Team10'
              },
              {
                value: 300,
                name: 'Team11'
              },
              {
                value: 200,
                name: 'Team12'
              },
              {
                value: 600,
                name: 'Team13'
              },
              {
                value: 321,
                name: 'Team14'
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

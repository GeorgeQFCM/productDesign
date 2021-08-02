<template>
  <div class="viewallItem_top_l_b_time">
    <!-- {{ dataTime.day }}天 -->
    <!-- <span class="viewallItem_top_l_b_timesty">{{ dataTime.day }}天</span>: -->
    <span class="viewallItem_top_l_b_timesty">{{ dataTime.hour }}时</span>
    :
    <span class="viewallItem_top_l_b_timesty">{{ dataTime.min }}分</span>
    :
    <span class="viewallItem_top_l_b_timesty">{{ dataTime.second }}秒</span>
  </div>
</template>
<script>
  import countTimeFun from "../../../../utils/showTime";
  export default {
    props: {
      itemTime: {
        type: String,
      },
    },
    data() {
      return {
        dataTime: {},
      };
    },

    mounted() {
      // console.log(this.itemTime, '传入的时间');
      countTimeFun(this.TimeNum, this.itemTime);
    },
    methods: {
      //时间计算
      TimeNum(val) {
        this.dataTime = val;
        return val;
      },
    },
  };
</script>


<style lang="scss" scoped>
  .viewallItem_top_l_b_time {
    display: inline;
    color: #E6A23C;
    font-size: 22rpx;
  }

  .viewallItem_top_l_b_timesty {
    width: 40rpx;
    height: 32rpx;
    line-height: 32rpx;
    text-align: center;
    background: #E6A23C;
    border-radius: 4rpx;
    color: #ffffff;
    display: inline-block;
  }
</style>
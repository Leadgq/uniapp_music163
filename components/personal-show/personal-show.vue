<template>
  <view class="area">
    <view class="title">
      <slot name='title'>每日推荐</slot>
    </view>
    <view class="gird-content">
      <view v-for="item in data" :key="item.id" class="grid-container" @click="emitData(item)">
        <img :src="item.picUrl" class="img-pic">
        <view class="desc-text">{{item.name}}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
  const props = defineProps({
    data: {
      type: Array,
      default: () => [],
      required: true
    },
    type: {
      type: String,
      required: true
    }
  })
  const emit = defineEmits();
  const emitData = (item) => {
    emit('selectItem', item, props.type);
  }
</script>

<style lang="scss" scoped>
  .area {

    .title {
      padding-left: 35rpx;
      width: 100%;
      height: 80rpx;
      background-color: #f1f1ff;
      line-height: 80rpx;
      font-size: 26rpx;
      position: relative;
      font-weight: bold;
      box-sizing: border-box;

      &::before {
        content: '';
        width: 8rpx;
        height: 35rpx;
        background-color: red;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 2%;
      }
    }

    .gird-content {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding-left: 20rpx;
      padding-right: 20rpx;
      padding-top: 20rpx;
      box-sizing: border-box;
      gap: 20rpx;

      .grid-container {
        width: 100%;

        .img-pic {
          width: 100%;
          height: 150rpx;
          border-radius: 10rpx;
        }

        .desc-text {
          font-size: 10rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
</style>

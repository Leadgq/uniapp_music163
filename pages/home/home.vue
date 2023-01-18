<template>
  <view class="home">
    <u-swiper :list="banners" :height='270'></u-swiper>
    <personal-show :data='personalizedData' @selectItem='selectItem' :type="'personalized'" />
    <personal-show :data='mvData' @selectItem='selectItem' :type="'mv'" style="margin-top: 20rpx;">
      <template #title>推荐MV</template>
    </personal-show>
  </view>
</template>

<script setup>
  import {
    getBanner,
    getPersonalized,
    getNewMvData
  } from "@/api/api.js";

  let banners = ref([]);
  let personalizedData = ref([]);
  let mvData = ref([]);

  onMounted(() => {
    getBannerData();
    getPersonalizedData();
    getNewMV();
  })
  const getBannerData = async () => {
    const result = await getBanner();
    banners.value = (result.banners || []).map(item => item.pic);
  }
  const getPersonalizedData = async () => {
    const data = await getPersonalized();
    personalizedData.value = data.result ?? [];
  }

  const getNewMV = async () => {
    const data = await getNewMvData();
    mvData.value = data.result ?? [];
  }

  const selectItem = (item, type) => {
    if(type === 'mv'){
       uni.navigateTo({
         url:`/pages/mv/mv?id=${item.id}`,
       })
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    width: 100%;
    height: 100%;

  }
</style>

<template>
  <scroll-view class="h-full" scroll-y>
    <view class="h-full flex flex-col px-6">
      <view class="flex items-center py-6" @click="onClickLogout()">
        <text class="material-icons text-gray-5">logout</text>
        <text class="ml-4 text-16px">退出登录</text>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
  const userStore = useUserStore()

  function onClickLogout() {
    userStore.logout()
    uni.navigateBack()
  }
</script>

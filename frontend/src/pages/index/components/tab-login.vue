<!-- views/Mine.vue -->
<template>
  <view class="h-full flex flex-col bg-gray-100">
    <view class="relative flex items-center justify-center">
      <image class="w-full h-60" mode="aspectFill" src="/static/login-tab-background.png" />
      <div
        class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-100 to-transparent"
      ></div>
    </view>
    <view class="flex flex-col items-center mt-auto mb-20">
      <navigator
        class="bg-#222222 text-gray-100 font-light flex flex-col items-center justify-center w-20 h-20 rounded-full transition-colors text-sm"
        url="/pages/login-register/index?type=login"
        :render-link="false"
        hover-class="bg-gray-600"
      >
        登录
        <br />
        <span class="text-xs"> ONE-个 </span>
      </navigator>
      <p class="mt-4 text-gray-600 flex">
        还没有账号？<navigator
          class="underline"
          url="/pages/login-register/index?type=register"
          :render-link="false"
          >点击注册</navigator
        >
      </p>
    </view>
  </view>
</template>

<script setup lang="ts">
  const userStore = useUserStore()

  watchEffect(() => {
    console.log(userStore.userInfo)
  })
</script>

<style scoped></style>

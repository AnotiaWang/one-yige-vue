<!-- views/Mine.vue -->
<template>
  <scroll-view class="h-full flex flex-col bg-gray-100" scroll-y>
    <view v-if="userInfo" class="flex flex-col pb-20">
      <navigator class="relative h-50 w-full bg-black" hover-class="none" url="edit-profile">
        <image
          class="absolute top-0 w-full h-full opacity-90"
          mode="aspectFill"
          src="/static/tab-user-header-background.jpg"
        />
        <view class="absolute bottom-7 left-6 flex items-center">
          <image
            v-if="userInfo.avatar"
            class="w-15 h-15 rounded-full border border-white border-solid"
            mode="aspectFill"
            :src="userInfo.avatar"
          />
          <view v-else class="h-15 w-15 bg-gray rounded-full flex items-center justify-center">
            <span class="material-icons text-gray-200 scale-200">person</span>
          </view>
          <text class="text-white text-lg ml-4">
            {{ userInfo.nickname ?? userInfo.username }}
          </text>
        </view>
      </navigator>
      <view class="flex items-center px-6 py-4 bg-white">
        我的小记
        <text class="ml-auto text-gray !text-12px">全部</text>
        <text class="material-icons text-gray !text-12px ml-0.5">arrow_forward_ios</text>
      </view>
      <view class="flex items-center justify-center bg-white py-6">
        <view class="flex flex-col text-gray rounded-lg outline-dashed outline-1 p-6">
          <view class="flex mx-auto items-center">
            <text class="material-icons-outlined">edit</text>
            <text class="ml-0.5">制作小记</text>
          </view>
          <text class="text-12px mt-1">记录你此刻的想法</text>
        </view>
      </view>
      <view class="px-6 bg-white">我的收藏</view>
      <!-- 日签、阅读、问答、长篇、收音机 -->
      <view class="flex items-center bg-white p-4 justify-around text-gray-5">
        <view class="flex flex-col items-center gap-2">
          <text class="material-icons-outlined !text-34px">wallpaper</text>
          <text class="text-12px">日签</text>
        </view>
        <view class="flex flex-col items-center gap-2">
          <text class="material-icons-outlined !text-34px">article</text>
          <text class="text-12px">阅读</text>
        </view>
        <view class="flex flex-col items-center gap-2">
          <text class="material-icons-outlined !text-34px">question_answer</text>
          <text class="text-12px">问答</text>
        </view>
        <view class="flex flex-col items-center gap-2">
          <text class="material-icons-outlined !text-34px">menu_book</text>
          <text class="text-12px">长篇</text>
        </view>
        <view class="flex flex-col items-center gap-2">
          <text class="material-icons-outlined !text-34px">radio</text>
          <text class="text-12px">收音机</text>
        </view>
      </view>
      <!-- 我的关注、投稿、关注我们、设置 -->
      <view class="mt-2 px-6 py-4 bg-white flex items-center text-gray-5">
        <view class="material-icons-outlined">group_add</view>
        <text class="ml-4 text-14px">我的关注</text>
        <text class="ml-auto !text-12px">0</text>
        <text class="ml-1 material-icons-outlined !text-12px">arrow_forward_ios</text>
      </view>
      <view class="mt-1px px-6 py-4 bg-white flex items-center text-gray-5">
        <view class="material-icons-outlined">edit</view>
        <text class="ml-4 text-14px">投稿</text>
        <text class="ml-auto material-icons-outlined !text-12px">arrow_forward_ios</text>
      </view>
      <view class="mt-1px px-6 py-4 bg-white flex items-center text-gray-5">
        <view class="material-icons-outlined">bookmark_add</view>
        <text class="ml-4 text-14px">关注我们</text>
        <text class="ml-auto material-icons-outlined !text-12px">arrow_forward_ios</text>
      </view>
      <navigator
        class="mt-1px px-6 py-4 bg-white flex items-center text-gray-5"
        hover-class="none"
        url="settings"
      >
        <view class="material-icons-outlined">settings</view>
        <text class="ml-4 text-14px">设置</text>
        <text class="ml-auto material-icons-outlined !text-12px">arrow_forward_ios</text>
      </navigator>
    </view>

    <view v-else class="flex flex-col h-full">
      <view class="relative flex items-center justify-center">
        <image class="w-full h-60" mode="aspectFill" src="/static/login-tab-background.jpeg" />
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
          >
            点击注册
          </navigator>
        </p>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
  const { userInfo } = storeToRefs(useUserStore())
</script>

<template>
  <view class="h-full">
    <view class="bg-gray-100 py-2 px-4">基本资料</view>
    <view class="flex items-center p-4" @click="onClickSelectAvatar()">
      头像
      <image
        v-if="userInfo?.avatar"
        class="ml-auto w-10 h-10 rounded-full"
        mode="aspectFill"
        :src="userInfo.avatar"
      ></image>
      <view v-else class="ml-auto">点击选择头像</view>
    </view>
    <view class="flex items-center p-4">
      昵称
      <input v-model="userInfo.nickname" class="ml-auto text-right" placeholder="输入昵称" />
    </view>

    <button
      class="mx-4 mt-4 bg-blue-400 text-white"
      :loading="loadingSave"
      :disabled="loadingSave"
      @click="onSubmit"
    >
      保存
    </button>
  </view>
</template>

<script setup lang="ts">
  import type { UserInfo } from '@/types/entity'

  const userStore = useUserStore()
  const userInfo = ref<Pick<UserInfo, 'avatar' | 'nickname'>>({
    avatar: '',
    nickname: '',
  })
  const loadingSave = ref(false)
  let filePath: string | undefined

  watchEffect(() => {
    if (userStore.userInfo) {
      userInfo.value = { ...userStore.userInfo }
    } else {
      userInfo.value = {
        avatar: '',
        nickname: '',
      }
    }
  })

  function onClickSelectAvatar() {
    uni.chooseImage({
      count: 1,
      sourceType: ['album'],
      success: (res) => {
        let _file: UniApp.ChooseImageSuccessCallbackResultFile | File
        if (Array.isArray(res.tempFiles)) {
          _file = res.tempFiles[0]
        } else {
          _file = res.tempFiles
        }
        if ('path' in _file) {
          userInfo.value.avatar = _file.path
          filePath = _file.path
        } else {
          userInfo.value.avatar = URL.createObjectURL(_file)
          filePath = userInfo.value.avatar
        }
      },
      fail(result) {
        // 无权限
        if (result.errMsg.includes('No Permission')) {
          uni.showModal({
            title: '提示',
            content: '您尚未授予相册权限，无法上传图片',
            confirmText: '前往授予权限',
            success: (res) => {
              if (res.confirm) {
                uni.openAppAuthorizeSetting()
              }
            },
          })
        }
      },
    })
  }

  async function onSubmit() {
    loadingSave.value = true
    try {
      const result = await api.updateUserInfo({
        avatar: filePath,
        nickname: userInfo.value.nickname,
      })
      userStore.userInfo = result
      uni.showToast({
        title: '保存成功',
        icon: 'success',
      })
      uni.navigateBack()
    } catch (error: any) {
      uni.showModal({
        title: '保存失败',
        content: error.message,
        showCancel: false,
      })
    }
    loadingSave.value = false
  }
</script>

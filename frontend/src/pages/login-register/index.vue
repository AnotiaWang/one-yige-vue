<template>
  <view class="flex flex-col h-screen">
    <image
      class="w-full h-60 shrink-0 object-cover"
      mode="aspectFill"
      src="/static/login-page-background.jpeg"
    />
    <view class="mx-8 mt-10 mb-4 flex flex-col h-full">
      <view class="">帐号密码{{ type === 'login' ? '登录' : '注册' }}</view>
      <view class="flex items-center mt-8">
        <span class="material-icons-outlined">person</span>
        <input
          class="w-full p-2 border-gray-300 rounded border-b border-0 border-solid ml-2"
          v-model="username"
          placeholder="请输入用户名"
        />
      </view>
      <view class="flex items-center mt-2 relative">
        <span class="material-icons-outlined">lock</span>
        <input
          class="w-full ml-2 p-2 border-gray-300 rounded border-b border-0 border-solid"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="请输入密码"
        />
        <span
          class="material-icons-outlined absolute right-2 top-1 bottom-0 flex items-center justify-center cursor-pointer"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? 'visibility' : 'visibility_off' }}
        </span>
      </view>

      <view class="flex items-center mt-auto mx-auto">
        <span class="material-icons" @click="isAgree = !isAgree">
          {{ isAgree ? 'check_circle' : 'radio_button_unchecked' }}
        </span>
        <text class="text-gray-600 ml-1">
          <text @click="isAgree = !isAgree">我已阅读并同意</text>
          <text class="text-blue-500 underline" @click.prevent="onClickTos">
            《用户服务协议》
          </text>
        </text>
      </view>
      <button
        class="w-full mt-4 flex items-center justify-center bg-gray-800 text-gray-100 rounded-lg transition-all"
        @click="type === 'login' ? onClickLogin() : onClickRegister()"
      >
        {{ type === 'login' ? '登录' : '注册' }}
      </button>
      <button
        class="w-full mt-2 flex items-center justify-center rounded-lg transition-all"
        @click="type = type === 'login' ? 'register' : 'login'"
      >
        {{ type === 'login' ? '注册' : '登录' }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
  const { safeTop } = storeToRefs(usePaddingsStore())
  const userStore = useUserStore()

  const type = ref<'login' | 'register'>('login')
  const username = ref('')
  const password = ref('')
  const isAgree = ref(false)
  const showPassword = ref(false)

  onLoad((query) => {
    if (query?.type) {
      type.value = query.type
    }
  })

  function onClickTos() {
    uni.showToast({
      title: '用户服务协议',
      icon: 'none',
      position: 'bottom',
    })
  }

  async function onClickLogin() {
    if (!isAgree.value) {
      uni.showToast({
        title: '请先同意用户服务协议和隐私政策',
        icon: 'none',
        position: 'bottom',
      })
      return
    }
    if (!username.value || !password.value) {
      uni.showToast({
        title: '请输入用户名和密码',
        icon: 'none',
        position: 'bottom',
      })
      return
    }
    try {
      const { token } = await api.login(username.value, password.value)
      userStore.token = token
      uni.showToast({
        title: '登录成功',
        icon: 'success',
        position: 'bottom',
      })
      uni.navigateBack()
    } catch (error: any) {
      uni.showToast({
        title: error.message,
        icon: 'none',
        position: 'bottom',
      })
    }
  }

  async function onClickRegister() {
    if (!isAgree.value) {
      uni.showToast({
        title: '请先同意用户服务协议和隐私政策',
        icon: 'none',
        position: 'bottom',
      })
      return
    }
    if (!username.value || !password.value) {
      uni.showToast({
        title: '请输入用户名和密码',
        icon: 'none',
        position: 'bottom',
      })
      return
    }
    try {
      const { token } = await api.register(username.value, password.value)
      userStore.token = token
      uni.showToast({
        title: '注册成功',
        icon: 'success',
        position: 'bottom',
      })
      uni.navigateBack()
    } catch (error: any) {
      uni.showToast({
        title: error.message,
        icon: 'none',
        position: 'bottom',
      })
    }
  }
</script>

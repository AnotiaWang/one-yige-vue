import type { UserInfo } from '@/types/entity'
import { useStorageValue } from '@/utils/useStorageValue'

export const useUserStore = defineStore('user', () => {
  const token = useStorageValue<string>('token', '', { noParse: true })
  const userInfo = ref<UserInfo>()
  const loggedIn = computed(() => !!userInfo.value)
  const networkConnected = inject<Ref<boolean>>('networkConnected')!

  onMounted(() => {
    watchEffect(async () => {
      if (token.value && networkConnected.value) {
        refetchUserInfo()
      }
    })
  })

  async function initialized() {
    return new Promise<void>((resolve) => {
      onMounted(() => {
        resolve()
      })
    })
  }

  async function refetchUserInfo() {
    try {
      userInfo.value = await api.getUserInfo()
    } catch (error: any) {
      if (error.message === 'Unauthorized') {
        userInfo.value = undefined
        token.value = ''
      } else {
        uni.showModal({ title: `获取用户信息失败`, content: error.message })
      }
    }
  }

  function logout() {
    token.value = ''
    userInfo.value = undefined
  }

  return {
    token,
    userInfo,
    loggedIn,

    initialized,
    refetchUserInfo,
    logout,
  }
})

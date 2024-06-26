import type { UserInfo } from '@/types/entity'
import { useStorageValue } from '@/utils/useStorageValue'

export const useUserStore = defineStore('user', () => {
  const token = useStorageValue<string>('token', '', { noParse: true })
  const userInfo = ref<UserInfo>()
  const loggedIn = computed(() => !!userInfo.value)

  onMounted(() => {
    watchEffect(async () => {
      if (token.value) {
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
    })
  })

  async function initialized() {
    return new Promise<void>((resolve) => {
      onMounted(() => {
        resolve()
      })
    })
  }

  return {
    token,
    userInfo,
    loggedIn,
    initialized,
  }
})

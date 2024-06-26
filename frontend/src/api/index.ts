import type { DailyCard, UserInfo } from '@/types/entity'

const req = promisify(uni.request)

// const baseUrl = 'http://localhost:3000'
const baseUrl = 'http://172.29.18.28:3000'

function parseResponse(result: UniApp.RequestSuccessCallbackResult) {
  if (result.statusCode === 400) {
    console.error(result)
    throw new Error((result.data as any).message)
  }
  return result.data
}

async function getHeader() {
  const userStore = useUserStore()
  if (userStore.token) return { Authorization: 'Bearer ' + userStore.token }
  return {}
}

export const api = {
  async login(username: string, password: string) {
    const result = await req({
      url: baseUrl + '/user/login',
      method: 'POST',
      data: { username, password },
    })
    return parseResponse(result) as { token: string }
  },

  async register(username: string, password: string) {
    const result = await req({
      url: baseUrl + '/user/register',
      method: 'POST',
      data: { username, password },
    })
    return parseResponse(result) as { token: string }
  },

  async getUserInfo() {
    const result = await req({
      url: baseUrl + '/user/info',
      method: 'GET',
      header: await getHeader(),
    })
    return parseResponse(result) as UserInfo
  },

  async createDailyCard(params: {
    content: string
    category: string
    source?: string
    imageUrl: string
  }) {
    const result = await req({
      url: baseUrl + '/daily-card',
      method: 'POST',
      data: params,
      header: await getHeader(),
    })
    return parseResponse(result) as DailyCard
  },

  async getDailyCardList() {
    const result = await req({
      url: baseUrl + '/daily-card',
      method: 'GET',
    })
    return parseResponse(result) as DailyCard[]
  },

  async toggleDailyCardLike(id: number) {
    const result = await req({
      url: baseUrl + `/daily-card/${id}/like`,
      method: 'POST',
      header: await getHeader(),
    })
    return parseResponse(result) as DailyCard
  },

  async toggleDailyCardMark(id: number) {
    const result = await req({
      url: baseUrl + `/daily-card/${id}/mark`,
      method: 'POST',
      header: await getHeader(),
    })
    return parseResponse(result) as DailyCard
  },
}

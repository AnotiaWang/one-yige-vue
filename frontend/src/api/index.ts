import type { Article, DailyCard, UserInfo } from '@/types/entity'

const req = promisify(uni.request)

// const baseUrl = 'http://localhost:3000'
const baseUrl = 'http://172.29.18.28:3000'

function parseResponse(
  result: UniApp.RequestSuccessCallbackResult | UniApp.UploadFileSuccessCallbackResult,
) {
  if (result.statusCode !== 200 && result.statusCode !== 201) {
    console.error(result)
    throw new Error((result.data as any).message)
  }
  if (typeof result.data === 'string') {
    return JSON.parse(result.data)
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

  async toggleLikeDailyCard(id: number) {
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

  async getArticleList() {
    const result = await req({
      url: baseUrl + '/article',
      method: 'GET',
    })
    return parseResponse(result) as Article[]
  },

  async getArticle(id: number) {
    const result = await req({
      url: baseUrl + `/article/${id}`,
      method: 'GET',
    })
    return parseResponse(result) as Article
  },

  async getRandomArticle() {
    const result = await req({
      url: baseUrl + '/article/random',
      method: 'GET',
    })
    return parseResponse(result) as Article
  },

  async toggleLikeArticle(id: number) {
    const result = await req({
      url: baseUrl + `/article/${id}/like`,
      method: 'POST',
      header: await getHeader(),
    })
    return parseResponse(result) as Article
  },

  async updateUserInfo(params: { nickname?: string; avatar?: string }) {
    let result: UniApp.UploadFileSuccessCallbackResult | UniApp.RequestSuccessCallbackResult

    if (params.avatar) {
      result = await promisify(uni.uploadFile)({
        url: baseUrl + '/user/info',
        filePath: params.avatar,
        name: 'avatar',
        header: await getHeader(),
        formData: {
          nickname: params.nickname,
        },
      })
    } else {
      result = await req({
        url: baseUrl + '/user/info',
        method: 'POST',
        data: params,
        header: await getHeader(),
      })
    }
    return parseResponse(result) as UserInfo
  },
}

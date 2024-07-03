import type { AMapWeather, Article, DailyCard, UserInfo } from '@/types/entity'

// 对 uni.request 进行 promisify 包装
const req = promisify(uni.request)

const baseUrl = 'http://localhost:3000'

// 处理后端返回的数据
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

// 从 Pinia store 中获取 token，调用需要鉴权的接口时需要传递 token
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

  async getWeather() {
    const location = await promisify(uni.getLocation)()
    const result = await req({
      url: baseUrl + '/user/weather',
      method: 'GET',
      data: {
        longtitude: location.longitude,
        latitude: location.latitude,
      },
    })
    return parseResponse(result) as AMapWeather
  },
}

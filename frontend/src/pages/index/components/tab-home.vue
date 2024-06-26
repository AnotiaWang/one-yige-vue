<template>
  <view class="flex flex-col h-full">
    <!-- 顶部 tabbar -->
    <view
      class="sticky px-3 py-4 top-0 flex items-end z-1 bg-white"
      :style="{ paddingTop: `${safeTop}px` }"
    >
      <template v-if="currentCardDate">
        <text class="text-30px font-serif tracking-tighter">
          {{ currentCardDate.day }}
        </text>
        <text class="text-14px ml-1 font-serif tracking-tighter">
          {{ currentCardDate.month }}.{{ currentCardDate.year }}
        </text>
        <text v-if="currentCardDate.isToday" class="ml-auto mr- text-gray-500 text-14px">
          地球·对流层 -273.15°C
        </text>
        <button v-else class="text-14px ml-auto mr-0 self-center my-auto" @click="findTodaysCard()">
          今天
        </button>
      </template>
    </view>

    <!-- 卡片内容 -->
    <swiper
      class="flex-1"
      :indicator-dots="false"
      :autoplay="false"
      :current-item-id="currentCard?.id"
      :circular="false"
      :previous-margin="false"
      @change="onSwipeChange"
    >
      <swiper-item v-for="card in cards" :key="card.id" :item-id="card.id">
        <view class="bg-white max-h-120 m-3 flex flex-col rounded-bl rounded-br shadow-md">
          <image class="w-full max-h-60" mode="aspectFill" :src="card.imageUrl" />
          <text class="mx-auto my-3 text-gray-4 text-14px">
            {{ card.category }} {{ card.source ? `| ${card.source}` : '' }}
          </text>
          <view class="my-5 mx-4">
            <span class="text-16px leading-28px whitespace-pre-line font-300">
              {{ card.content }}
            </span>
          </view>
        </view>
        <view class="flex items-center mx-3">
          <span
            :class="['material-icons mx-3 ml-auto', card.markUsers.includes(userInfo?.id!) && 'text-yellow']"
            @click="toggleMark()"
          >
            {{ card.markUsers.includes(userInfo?.id!) ? 'bookmark' : 'bookmark_border' }}
          </span>
          <text
            :class="['material-icons ml-3 mr-1', card.likeUsers.includes(userInfo?.id!) && 'text-red']"
            @click="toggleLike()"
          >
            {{ card.likeUsers.includes(userInfo?.id!) ? 'favorite' : 'favorite_border' }}
          </text>
          <text class="text-gray text-14px">{{ card.likeUsers.length ?? 0 }}</text>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
  import type { DailyCard } from '@/types/entity'

  const { safeTop } = storeToRefs(usePaddingsStore())
  const { userInfo } = storeToRefs(useUserStore())

  const cards = ref<DailyCard[]>([])
  const currentCard = ref<DailyCard>()
  const currentCardDate = computed(() => {
    if (!currentCard.value) return
    return {
      day: getDay(currentCard.value.createdAt),
      month: getMonthString(currentCard.value.createdAt),
      year: getYearString(currentCard.value.createdAt),
      isToday: currentCard.value.createdAt === new Date().toISOString().split('T')[0],
    }
  })

  async function listCards() {
    try {
      cards.value = await api.getDailyCardList()
      findTodaysCard()
      if (!currentCard.value) currentCard.value = cards.value[0]
    } catch (error: any) {
      uni.showModal({
        title: '获取卡片列表失败',
        content: error.message,
        showCancel: false,
      })
    }
  }

  async function toggleLike() {
    if (!userInfo.value) {
      return uni.navigateTo({
        url: '/pages/login-register/index?type=login',
      })
    }
    if (!currentCard.value) return
    try {
      const result = await api.toggleDailyCardLike(currentCard.value.id)

      cards.value = cards.value.map((card) => {
        if (card.id === result.id) return result
        return card
      })
    } catch (error: any) {
      uni.showModal({
        title: '点赞失败',
        content: error.message,
        showCancel: false,
      })
    }
  }

  async function toggleMark() {
    if (!userInfo.value) {
      return uni.navigateTo({
        url: '/pages/login-register/index?type=login',
      })
    }
    if (!currentCard.value) return
    try {
      currentCard.value = await api.toggleDailyCardMark(currentCard.value.id)
      cards.value = cards.value.map((card) => {
        if (card.id === currentCard.value?.id) return currentCard.value
        return card
      })
    } catch (error: any) {
      uni.showModal({
        title: '收藏失败',
        content: error.message,
        showCancel: false,
      })
    }
  }

  function findTodaysCard() {
    const currentDate = new Date().toISOString().split('T')[0]
    currentCard.value = cards.value.find((card) => card.createdAt === currentDate)
  }

  function getDay(date: string) {
    return new Date(date).getDate()
  }

  function getMonthString(date: string) {
    console.log(date)
    return new Date(date).toDateString().split(' ')[1]
  }

  function getYearString(date: string) {
    console.log(date)
    return date.split('-')[0]
  }

  function onSwipeChange(e: any) {
    const { current } = e.detail
    currentCard.value = cards.value[current]
  }

  onMounted(() => {
    listCards()
  })
</script>

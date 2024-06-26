<template>
  <view class="h-full">
    <scroll-view class="h-full mb-4" scroll-y>
      <view v-if="article" class="flex flex-col px-6 mt-8">
        <text class="text-2xl font-bold">{{ article.title }}</text>
        <text class="text-gray text-12px mt-4">文 / {{ article.author }}</text>
        <image
          class="w-full h-40 mt-4"
          mode="aspectFill"
          :src="article.coverUrl"
          @click="onClickPreviewImage(article.coverUrl)"
        />
        <text class="text-16px mt-4 leading-28px">{{ article.content }}</text>
      </view>
    </scroll-view>

    <view v-if="article" class="sticky bottom-0 h-15 bg-white w-full flex items-center">
      <span
        :class="['material-icons ml-auto', article.likeUsers.includes(userInfo?.id!) && 'text-red']"
        @click="toggleArticleLike()"
      >
        {{ article.likeUsers.includes(userInfo?.id!) ? 'favorite' : 'favorite_border' }}
      </span>
      <text class="text-gray text-14px ml-1 mr-4">{{ article.likeUsers.length ?? 0 }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
  import type { Article } from '@/types/entity'

  const { safeBottom } = storeToRefs(usePaddingsStore())
  const { userInfo } = storeToRefs(useUserStore())

  const article = ref<Article>()

  onLoad((query) => {
    if (query?.id) {
      loadArticle(Number(query.id))
    } else {
      uni.navigateBack()
    }
  })

  async function loadArticle(id: number) {
    try {
      article.value = await api.getArticle(id)
    } catch (error: any) {
      uni.showModal({
        title: '获取文章失败',
        content: error.message,
        showCancel: false,
      })
    }
  }

  async function toggleArticleLike() {
    if (!article.value) return
    if (!userInfo?.value) {
      uni.navigateTo({
        url: '/pages/login-register/index?type=login',
      })
      return
    }

    try {
      article.value = await api.toggleLikeArticle(article.value.id)
      uni.vibrateShort()
    } catch (error: any) {
      uni.showModal({
        title: '点赞失败',
        content: error.message,
        showCancel: false,
      })
    }
  }

  function onClickPreviewImage(imageUrl: string) {
    uni.previewImage({
      urls: [imageUrl],
    })
  }
</script>

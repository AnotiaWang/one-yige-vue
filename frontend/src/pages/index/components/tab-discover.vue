<template>
  <view class="h-full overflow-hidden">
    <scroll-view
      class="sticky top-0 h-16"
      scroll-x
      enable-flex
      :style="{ paddingTop: `${safeTop}px` }"
    >
      <view class="flex h-full mx-4">
        <view
          class="flex items-center justify-center shrink-0 w-16"
          v-for="tab in tabs"
          :key="tab.index"
          :class="[
            'cursor-pointer',
            currentTab === tab.index ? 'text-26px text-black' : 'text-gray-500',
          ]"
          @click="currentTab = tab.index"
        >
          {{ tab.name }}
        </view>
      </view>
    </scroll-view>

    <swiper
      class="h-full bg-gray-100"
      :current="currentTab"
      skip-hidden-item-layout
      @change="currentTab = $event.detail.current"
    >
      <swiper-item v-for="tab in tabs" :key="tab.index">
        <scroll-view class="h-full" scroll-y>
          <view v-if="tab.index === Tab.Read" class="pb-20">
            <navigator
              v-for="article in articles"
              :key="article.id"
              :url="`/pages/article/index?id=${article.id}`"
              hover-class="none"
            >
              <view class="flex m-4">
                <image
                  class="w-15 h-15 rounded-lg shrink-0"
                  mode="aspectFill"
                  :src="article.coverUrl"
                />
                <view class="flex flex-col justify-around ml-4">
                  <text class="line-clamp-1">{{ article.title }}</text>
                  <text class="text-gray text-12px">文 / {{ article.author }}</text>
                </view>
              </view>
            </navigator>
          </view>
          <template v-else-if="tab.index === Tab.Question"></template>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
  import type { Article } from '@/types/entity'

  enum Tab {
    /** 阅读 */
    Read,
    /** 问答 */
    Question,
  }

  const { safeTop } = storeToRefs(usePaddingsStore())

  const tabs = [
    { name: '阅读', index: Tab.Read },
    { name: '问答', index: Tab.Question },
  ]
  const currentTab = ref<Tab>(Tab.Read)

  const articles = ref<Article[]>([])

  async function fetchArticles() {
    try {
      articles.value = await api.getArticleList()
    } catch (error: any) {
      uni.showModal({
        title: '获取文章列表失败',
        content: error.message,
        showCancel: false,
      })
    }
  }

  onMounted(() => {
    fetchArticles()
  })
</script>

<template>
  <view class="flex flex-col h-screen">
    <div class="mb-59px h-full">
      <tab-home v-show="tab === Tab.Home"></tab-home>
      <tab-discover v-show="tab === Tab.Discover"></tab-discover>
      <tab-login v-show="tab === Tab.Profile"></tab-login>
    </div>
    <tab-bar>
      <tab-bar-button
        v-for="item in tabs"
        :key="item.tab"
        :title="item.title"
        :icon="item.icon"
        :selected="tab === item.tab"
        @click="tab = item.tab"
      ></tab-bar-button>
    </tab-bar>
  </view>
</template>

<script setup lang="ts">
  import TabHome from './components/tab-home.vue'
  import TabDiscover from './components/tab-discover.vue'
  import TabLogin from './components/tab-login.vue'

  enum Tab {
    Home,
    Discover,
    Radio,
    Profile,
  }

  const tab = ref<Tab>(Tab.Discover)

  const tabs = [
    { title: '首页', icon: 'circle', tab: Tab.Home },
    { title: '发现', icon: 'grid_view', tab: Tab.Discover },
    { title: '收音机', icon: 'radio', tab: Tab.Radio },
    { title: '我的', icon: 'person', tab: Tab.Profile },
  ]
</script>

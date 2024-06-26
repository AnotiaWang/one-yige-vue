<template>
  <view class="flex flex-col items-center justify-center text-gray-600 h-56px w-full">
    <span :class="selected ? 'material-icons-sharp' : 'material-icons-outlined'">{{ icon }}</span>
    <span class="text-12px">{{ title }}</span>
  </view>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
    icon: string
    selected: boolean
  }>()
</script>

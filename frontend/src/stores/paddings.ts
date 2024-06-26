export const usePaddingsStore = defineStore('paddings', () => {
  const systemInfo = uni.getSystemInfoSync()
  const menuRect = uni.getMenuButtonBoundingClientRect?.() ?? { top: 4, height: 40 }

  const screenWidth = ref(systemInfo.screenWidth)
  const screenHeight = ref(systemInfo.screenHeight)
  const safeTop = ref(systemInfo.statusBarHeight ?? 0)
  const safeBottom = ref(systemInfo.safeAreaInsets?.bottom ?? 34)
  const menuBarHeight = computed(() => 2 * (menuRect.top - safeTop.value) + menuRect.height)
  const headerHeight = computed(() => safeTop.value + menuBarHeight.value)

  const tabBarHeight = computed(() => safeBottom.value + 56)
  const weekBarHeight = computed(() => safeTop.value + menuBarHeight.value + 56)
  const isSmallScreenDevice = computed(() => screenWidth.value < 375)

  return {
    screenWidth,
    screenHeight,
    safeTop,
    safeBottom,
    headerHeight,
    menuBarHeight,
    tabBarHeight,
    weekBarHeight,
    /**
     * 是否为超小屏设备（如 iPhone 5）
     */
    isSmallScreenDevice,
  }
})

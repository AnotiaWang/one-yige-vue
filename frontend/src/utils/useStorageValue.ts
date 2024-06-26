import type { Ref } from 'vue'

interface Options {
  /** 是否禁用 JSON 转换，默认 `false` */
  noParse: boolean
}

export function useStorageValue<T>(key: string, defaultValue: T, options?: Options) {
  const state = ref<T>() as Ref<T>
  const parse = !options?.noParse

  const persistedValue = uni.getStorageSync(key)
  if (persistedValue) {
    if (!parse) {
      state.value = persistedValue
    } else {
      const obj = JSON.parse(persistedValue)
      if (typeof obj === 'string') {
        state.value = obj as unknown as T
      } else if (Array.isArray(obj)) {
        state.value = obj as unknown as T
      } else {
        state.value = { ...defaultValue, ...obj }
      }
    }
  } else {
    state.value = defaultValue
  }

  watchEffect(() => {
    if (state.value) {
      uni.setStorageSync(key, parse ? JSON.stringify(state.value) : state.value)
    } else {
      uni.removeStorage({ key })
    }
  })

  return state
}

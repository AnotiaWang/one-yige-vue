<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

  const networkConnected = ref(false)

  provide('networkConnected', networkConnected)

  onLaunch(() => {
    console.log('App Launch')
    uni.getNetworkType({
      success: (result) => {
        networkConnected.value = result.networkType !== 'none'
        if (!networkConnected.value) {
          uni.showModal({
            title: '网络已断开',
            content: '请检查网络连接。连接网络后，会自动加载数据。',
            showCancel: false,
          })
        }
      },
    })
    uni.onNetworkStatusChange((res) => {
      networkConnected.value = res.isConnected
      uni.showToast({
        title: res.isConnected ? `已连接到 ${res.networkType}` : '网络已断开',
        icon: res.isConnected ? 'success' : 'fail',
        position: 'bottom',
        duration: 5000,
      })
    })
  })
  onShow(() => {
    console.log('App Show')
  })
  onHide(() => {
    console.log('App Hide')
  })
</script>
<style></style>

import { reactive } from 'vue'

const useTableSkeletonLoading = reactive({
  isLoading: false,
  show() {
    this.isLoading = true
  },
  hide() {
    this.isLoading = false
  }
})

export default useTableSkeletonLoading

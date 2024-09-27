import useResourceData from '@/stores/useResourceData'
import useConfirmModal from '../components/ResourceConfirmModal/useConfirmModal'
import useResourceIndicator from '../components/ResourceIndicator/useResourceIndicator'
import useTableSkeletonLoading from '../components/ResourceList/TableSkeleton/useTableSkeletonLoading'
import { ref } from 'vue'
let selectedAction = ref(null)
let selectedItem = ref(null)
export default function useResourceList()
{

  const resourceData = useResourceData();
  const openConfirmModal = (action, item) =>
  {
    selectedAction.value = action
    selectedItem.value = item
    useConfirmModal.open()
  }

  const handleConfirmModal = async () =>
  {
    useResourceIndicator.show()
    if (selectedAction.value)
    {
      await selectedAction.value.handle({
        item: selectedItem.value.item,
        index: selectedItem.value.index
      })
      useConfirmModal.close()
    }

    useResourceIndicator.hide()


    resetSelectedAction()
  }
  const resetSelectedAction = () =>
  {
    selectedAction.value = null
    selectedItem.value = null
  }

  const fetchResourceData = async (fetchData, url = null) =>
  {
    useTableSkeletonLoading.show()

    let response = await fetchData(url)
    if (typeof fetchData !== 'function')
    {
      throw BaseResourceException.missingDataMethod('BaseResource');
    }
    resourceData.list.value = response?.data ? response.data : response;
    resourceData.pagination.value = response.pagination ?? []



    useTableSkeletonLoading.hide()

  }
  const debounce = (func, wait = 400) =>
  {
    let timeout
    return (...args) =>
    {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  }
  return {
    selectedAction,
    selectedItem,
    openConfirmModal,
    handleConfirmModal,
    fetchResourceData,
    debounce
  }
}

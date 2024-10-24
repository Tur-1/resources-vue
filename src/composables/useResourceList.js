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

    
    if (selectedAction.value.deleteAction) {
      resourceData.removeItem(selectedItem.value.index)
    }
    useResourceIndicator.hide()


    resetSelectedAction()
  }
  const resetSelectedAction = () =>
  {
    selectedAction.value = null
    selectedItem.value = null
  }

  const fetchResourceData = async (fetchData) =>
  { 
    useTableSkeletonLoading.show()   
    
    try { 
      
    let response = await fetchData() 
    if (Array.isArray(response)) {
      resourceData.list.value = response;
    }else if(!Array.isArray(response) && response.data  && response.links && response.meta){
      resourceData.list.value = response.data;
      resourceData.pagination.value = {...response.links, ...response.meta}
    }else if(!Array.isArray(response) && response.data && response.pagination){
      resourceData.list.value = response.data;
      resourceData.pagination.value = response.pagination;
    }
  
    
  } catch (error) {
    console.error("Error fetching resource data:", error);
  } finally {
    useTableSkeletonLoading.hide();
  }


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

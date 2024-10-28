import useConfirmModal from "../components/ResourceConfirmModal/useConfirmModal";
import useResourceIndicator from "../components/ResourceIndicator/useResourceIndicator";
import useTableSkeletonLoading from "../components/ResourceList/TableSkeleton/useTableSkeletonLoading";
import { ref } from "vue";

let selectedAction = ref(null);
let selectedItem = ref(null);
let dataList = ref([]);
let pagination = ref([]);
let wasRemovedSuccessfully = ref(false);


export default function useBaseResource()
{

  const openConfirmModal = (action, item) =>
  {
    selectedAction.value = action;
    selectedItem.value = item;
    useConfirmModal.open();
  };

  const handleConfirmModal = async () =>
  {
    useResourceIndicator.show();
    if (selectedAction.value)
    {
      await selectedAction.value.handle(selectedItem.value.item);
      useConfirmModal.close();

      if (selectedAction.value.isDeleteAction)
      {
        removeItem(selectedItem.value.index);
      }
    }

    useResourceIndicator.hide();

    resetSelectedAction();
  };
  const resetSelectedAction = () =>
  {
    selectedAction.value = null;
    selectedItem.value = null;
  };

  const fetchResourceData = async (fetchData) =>
  {
    dataList.value = [];
    useTableSkeletonLoading.show();

    try
    {
      let response = await fetchData();
      if (Array.isArray(response))
      {
        dataList.value = response;
      } else if (
        !Array.isArray(response) &&
        response.data &&
        response.links &&
        response.meta
      )
      {
        dataList.value = response.data;
        pagination.value = { ...response.links, ...response.meta };
      } else if (
        !Array.isArray(response) &&
        response.data &&
        response.pagination
      )
      {
        dataList.value = response.data;
        pagination.value = response.pagination;
      }
    } catch (error)
    {
      console.error("Error fetching resource data:", error);
    } finally
    {
      useTableSkeletonLoading.hide();
    }


  };
  const debounce = (func, wait = 400) =>
  {
    let timeout;
    return (...args) =>
    {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const removeItem = (index) =>
  {
    dataList.value.splice(index, 1);

    wasRemovedSuccessfully.value = true;
  };
  const getRecordImage = (item, column) =>
  {
    if (column.image && !column.field && !column.nestedField)
    {
      return defaultImage;
    }
    if (column.nestedField)
    {
      return item[column.field]?.[column.nestedField] || defaultImage;
    }

    return item[column.field];
  };
  const getRecordValue = (item, column) =>
  {
    if (column.nestedField)
    {
      return item[column.field]?.[column.nestedField];
    }
    return item[column.field];
  };

  return {
    selectedAction,
    selectedItem,
    openConfirmModal,
    handleConfirmModal,
    fetchResourceData,
    debounce,
    dataList,
    pagination,
    getRecordValue,
    getRecordImage,
  };
}

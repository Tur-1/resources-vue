import useConfirmModal from "../components/ResourceConfirmModal/useConfirmModal";
import useResourceIndicator from "../components/ResourceIndicator/useResourceIndicator";
import useTableSkeletonLoading from "../components/ResourceList/TableSkeleton/useTableSkeletonLoading";
import { ref } from "vue";

let selectedAction = ref(null);
let selectedItem = ref(null);
let dataList = ref([]);
let pagination = ref([]);
let wasRemovedSuccessfully = ref(false);
let selectedItems = ref([]);
let bulkItems = ref([]);
let isSelectAllItems = ref(false);

export default function useBaseResource() {
  const openConfirmModal = (action, item) => {
    selectedAction.value = action;
    selectedItem.value = item;
    useConfirmModal.open();
  };
  const toggleSelectAll = () => {
    if (isSelectAllItems.value) {
      selectedItems.value = [...dataList.value];
    } else {
      selectedItems.value = [];
    }
  };
  const handleConfirmModal = async () => {
    useResourceIndicator.show();
    if (selectedAction.value) {
      await selectedAction.value.handle(selectedItem.value.item);
      useConfirmModal.close();

      if (selectedAction.value.isDeleteAction) {
        removeItem(selectedItem.value.index);
      }
    }

    useResourceIndicator.hide();

    resetSelectedAction();
  };
  const resetSelectedAction = () => {
    selectedAction.value = null;
    selectedItem.value = null;
  };

  const fetchResourceData = async (table) => {
    dataList.value = [];
    useTableSkeletonLoading.show();

    try {
      let response = await table().getData();

      if (Array.isArray(response)) {
        dataList.value = response;
      } else if (
        !Array.isArray(response) &&
        response.data &&
        response.links &&
        response.meta
      ) {
        dataList.value = response.data;
        pagination.value = {
          ...response.links,
          ...response.meta,
        };
      } else if (
        !Array.isArray(response) &&
        response.data &&
        response.pagination
      ) {
        dataList.value = response.data;
        pagination.value = response.pagination;
      }
    } catch (error) {
      console.error("Error fetching resource data:", error);
    } finally {
      useTableSkeletonLoading.hide();
    }
  };
  const debounce = (func, wait = 400) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const removeItem = (index) => {
    dataList.value.splice(index, 1);

    wasRemovedSuccessfully.value = true;
  };

  return {
    selectedItems,
    bulkItems,
    toggleSelectAll,
    isSelectAllItems,
    selectedAction,
    selectedItem,
    openConfirmModal,
    handleConfirmModal,
    fetchResourceData,
    debounce,
    dataList,
    pagination,
  };
}

import { ref } from "vue";

let list = ref([])
let pagination = ref([])


export default function useResourceData()
{
    let wasRemovedSuccessfully = ref(false)

    const removeItem = (index) =>
    {
        wasRemovedSuccessfully.value = false;

        list.value.splice(index, 1)

        wasRemovedSuccessfully.value = true;
    }
    return {
        list,
        pagination,
        removeItem
    }
};
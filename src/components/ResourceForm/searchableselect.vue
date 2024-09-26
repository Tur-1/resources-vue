<template>
  <div class="select-container" :class="props.class" ref="selectContainer">
    <!-- Searchable input -->
    <div class="select-input-wrapper">
      <label @click="toggleDropdown" class="select-label">{{
        selectedOption?.label ?? 'select'
      }}</label>

      <span @click="toggleDropdown" class="select-arrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </div>

    <!-- Dropdown options -->
    <div v-if="showDropdown" class="select-dropdown">
      <div class="dropdown-item" v-if="searchable">
        <input
          type="text"
          v-model="searchQuery"
          @focus="showDropdown = true"
          @input="filterOptions"
          class="select-input"
          placeholder="Search"
        />
      </div>
      <ul>
        <li
          v-for="(option, index) in filteredOptions"
          :key="index"
          @click="selectOption(option)"
          :class="{
            selected: selectedOption === option,
            'dropdown-item': true
          }"
        >
          <span class="dropdown-emoji">{{ option.emoji }}</span> {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  class: String,
  searchable: {
    default: true,
    type: Boolean
  }
})
const searchQuery = ref('')
const showDropdown = ref(false)
const selectedOption = ref(null)
const selectContainer = ref(null)
const options = ref([
  { label: 'Education' },
  { label: 'Yeeeah, science!' },
  { label: 'Art' },
  { label: 'Sport' },
  { label: 'Games' },
  { label: 'Health' }
])

const filteredOptions = ref([...options.value])

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

// Filter options based on search query
const filterOptions = () => {
  const query = searchQuery.value.toLowerCase()
  filteredOptions.value = options.value.filter((option) =>
    option.label.toLowerCase().includes(query)
  )
}

// Select an option and close the dropdown
const selectOption = (option) => {
  selectedOption.value = option
  searchQuery.value = option.label
  showDropdown.value = false
  searchQuery.value = ''
  filteredOptions.value = [...options.value]
}

// Handle clicks outside the component
const handleClickOutside = (event) => {
  if (selectContainer.value && !selectContainer.value.contains(event.target)) {
    showDropdown.value = false // Close dropdown if clicked outside
  }
}

// Add event listener on mounted and clean up on unmounted
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.select-container {
  position: relative;
  font-family: Arial, sans-serif;
  overflow: visible;
}

.select-input-wrapper {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: #fff;
}

.select-input {
  width: 100%;
  padding: 6px;
  border: 1px solid #ccc;
  outline: none;
  border-radius: 8px;
}

.select-label {
  cursor: pointer;
  width: 100%;
}
.select-arrow {
  cursor: pointer;
  padding: 4px;
}

.icon {
  height: 20px;
  width: 20px;
}

.select-dropdown {
  position: absolute;
  display: flex;
  top: 100%; /* Position the dropdown exactly below the select input */
  transform: translateY(10px);
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: 8px;
  max-height: 300px;
  z-index: 10;
  overflow-y: hidden;
  border: 1px solid #d1d5db;
}
.select-dropdown ul {
  overflow-y: auto;
  padding: 0;
}
.dropdown-item {
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f9f9f9;
}

.dropdown-emoji {
  margin-right: 8px;
}

.selected {
  background-color: #cccccc73;
}

.selected:hover {
  background-color: #f9f9f9;
}
</style>

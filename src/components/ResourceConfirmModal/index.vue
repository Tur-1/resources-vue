<script setup>
import useConfirmModal from './useConfirmModal'
import useResourceIndicator from '@/components/ResourceIndicator/useResourceIndicator'
const emits = defineEmits(['onConfirmModalClose', 'onConfirm'])

const closeModal = () => {
  useConfirmModal.close()
  emits('onConfirmModalClose')
}
const onConfirm = () => {
  emits('onConfirm')
}
</script>
<template>
  <Transition name="slide">
    <div class="confirm-modal-bg" id="confirm-modal" v-if="useConfirmModal.isOpen">
      <div class="confirm-modal">
        <div class="confirm-modal-content">
          <div class="confirm-modal-body">
            <h6>are you sure ?</h6>
          </div>
          <div class="confirm-modal-footer">
            <button
              type="button"
              :disabled="useResourceIndicator.isOnProgress"
              class="btn btn-gray-100"
              @click="closeModal"
            >
              <span>Close</span>
            </button>

            <button
              type="button"
              class="btn btn-primary d-flex justify-content-center"
              @click="onConfirm"
              :disabled="useResourceIndicator.isOnProgress"
            >
              <span>Confirm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style>
@import './confirm-modal.css';
</style>
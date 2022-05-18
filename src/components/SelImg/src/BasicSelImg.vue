<template>
  <div>
    <a-button-group>
      <a-input v-model:value="bindValue.value" />
      <a-button type="primary" @click="openUploadModal" preIcon="carbon:cloud-upload">
        选择图片
      </a-button>
    </a-button-group>
  </div>
  <SelImgModal @register="registerUploadModal" @success="handleSuccess" />
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import SelImgModal from './SelImgModal.vue';
  import { useModal } from '/@/components/Modal';
  import { uploadContainerProps } from './props';
  import { omit } from 'lodash-es';
  export default defineComponent({
    name: 'BasicSelImg',
    components: { SelImgModal },
    props: uploadContainerProps,
    emits: ['change', 'delete', 'preview-delete', 'update:value'],

    setup(props, { emit, attrs }) {
      // 上传modal
      const [registerUploadModal, { openModal: openUploadModal }] = useModal();

      const bindValue = computed(() => {
        const value = { ...attrs, ...props };
        return omit(value, 'onChange');
      });

      function handleSuccess(url: string) {
        console.log(url);
        emit('change', url);
        emit('update:value', url);
      }

      return {
        registerUploadModal,
        openUploadModal,
        bindValue,
        handleSuccess,
      };
    },
  });
</script>

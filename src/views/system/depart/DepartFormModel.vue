<template>
  <Spin :spinning="loading">
    <BasicForm @register="registerForm" />
    <div style="margin-top: 30px">
      <div class="btnls">
        <a-button type="primary" danger preIcon="ant-design:delete-outlined" @click="onDelete">
          删除
        </a-button>
        <a-button type="primary" preIcon="ant-design:save-filled" @click="onSubmit">保存</a-button>
      </div>
    </div>
  </Spin>
</template>

<script lang="ts">
  import { defineComponent, ref, toRaw, unref, watch, onMounted } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { DepartModelForm } from './depart.data';
  import { saveOrUpdateDepart, DelDepart } from './depart.api';
  import { Spin } from 'ant-design-vue';
  export default defineComponent({
    name: 'DepartFormModal',
    components: {
      BasicForm,
      Spin,
    },
    props: {
      data: { type: Object, default: () => ({}) },
      rootTreeData: { type: Array, default: () => [] },
    },
    emits: ['success'],
    setup(props, { emit }) {
      const loading = ref<boolean>(false);
      const isUpdate = ref<boolean>(true);
      const model = ref<object>({});
      const [registerForm, { setFieldsValue, validate, updateSchema }] = useForm({
        labelWidth: 100,
        schemas: DepartModelForm,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      async function onSubmit() {
        console.log('submit');
        try {
          loading.value = true;
          const values = await validate();
          // TODO custom api
          console.log(values);
          const res = await saveOrUpdateDepart(values, unref(isUpdate));
          console.log(res);
          loading.value = false;
          emit('success');
        } finally {
          loading.value = false;
        }
      }

      async function onDelete() {
        loading.value = true;
        try {
          const values = await validate();
          // TODO custom api
          console.log(values);
          const res = await DelDepart(values, true);
          console.log(res);
          loading.value = false;
          emit('success');
        } finally {
          loading.value = false;
        }
      }
      onMounted(() => {
        // 禁用字段
        updateSchema([
          { field: 'pid', componentProps: { disabled: true } },
          { field: 'code', show: true },
        ]);
        // 更新 父部门 选项
        watch(
          () => props.rootTreeData,
          async () => {
            console.log(props.rootTreeData);
            let treeData = toRaw(props.rootTreeData);
            updateSchema([
              {
                field: 'pid',
                componentProps: { treeData },
              },
            ]);
          },
        );
        watch(
          () => props.data,
          async () => {
            let data = toRaw(props.data);
            console.log(data);
            setFieldsValue({
              ...data,
            });
          },
        );
      });

      return {
        registerForm,
        model,
        onSubmit,
        loading,
        onDelete,
      };
    },
  });
</script>
<style lang="less">
  .btnls {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    button {
      margin-left: 10px;
    }
  }
</style>

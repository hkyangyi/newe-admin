<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './account.data';
  import { VerifySole } from '/@/api/sys/base';
  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    props: {
      rootTreeData: { type: Array, default: () => [] },
    },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          await updateSchema([
            {
              field: 'username',
              label: '用户名',
              component: 'Input',
              helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
                {
                  validator(_, values) {
                    console.log(values);
                    return new Promise((resolve, reject) => {
                      VerifySole({
                        tablename: 'sys_member',
                        fieldname: 'username',
                        tableid: data.record.id,
                        tablevalue: values,
                      })
                        .then(() => resolve())
                        .catch((err) => {
                          reject(err.message || '验证失败');
                        });
                    });
                  },
                },
              ],
            },
          ]);
          setFieldsValue({
            ...data.record,
          });
        } else {
          await updateSchema([
            {
              field: 'username',
              label: '用户名',
              component: 'Input',
              helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                },
                {
                  validator(_, values) {
                    console.log(values);
                    return new Promise((resolve, reject) => {
                      VerifySole({
                        tablename: 'sys_member',
                        fieldname: 'username',
                        tablevalue: values,
                      })
                        .then(() => resolve())
                        .catch((err) => {
                          reject(err.message || '验证失败');
                        });
                    });
                  },
                },
              ],
            },
          ]);
        }

        const treeData = props.rootTreeData;
        await updateSchema([
          {
            field: 'departId',
            componentProps: { treeData },
          },
          {
            field: 'password',
            show: !unref(isUpdate),
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

      async function handleSubmit() {
        try {
          const values = await validate();
          console.log(values);
          setModalProps({ confirmLoading: true });
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      // onMounted(() => {
      //   watch(
      //     () => props.rootTreeData,
      //     async () => {
      //       let treeData = props.rootTreeData;
      //       console.log(treeData);
      //       updateSchema([
      //         {
      //           field: 'departId',
      //           componentProps: { treeData },
      //         },
      //       ]);
      //     },
      //   );
      // });

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>

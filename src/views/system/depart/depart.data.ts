import { FormSchema } from '/@/components/Form';

//departmodelform
export const DepartModelForm: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '机构名称',
    component: 'Input',
    componentProps: {
      placeholder: '请输入机构/部门名称',
    },
    rules: [{ required: true, message: '机构名称不能为空' }],
  },
  {
    field: 'type',
    label: '机构类型',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '集团', value: 1 },
        { label: '公司', value: 2 },
        { label: '部门', value: 3 },
        { label: '服务门店', value: 4 },
      ],
    },
  },
  {
    field: 'pid',
    label: '上级',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        label: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'code',
    label: '组织编码',
    component: 'Input',
    componentProps: { disabled: true },
  },
  {
    field: 'sortNo',
    label: '排序',
    component: 'InputNumber',
    componentProps: {},
  },
  {
    field: 'phone',
    label: '手机',
    component: 'Input',
    componentProps: {
      placeholder: '请输入手机号码',
    },
  },
  {
    field: 'telephone',
    label: '座机',
    component: 'Input',
    componentProps: {
      placeholder: '请输入电话',
    },
  },
  {
    field: 'address',
    label: '地址',
    component: 'Input',
    componentProps: {
      placeholder: '请输入地址',
    },
  },
];

import { VerifySole } from '/@/api/sys/base';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { formatDate } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: '真实姓名',
    dataIndex: 'realname',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 200,
    customRender: ({ text }) => {
      const date: number = parseInt(text);
      return formatDate(date * 1000);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'realname',
    label: '真实姓名',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    label: 'id',
    field: 'id',
    component: 'Input',
    show: false,
  },
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
              tableid: '',
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
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
  },
  {
    field: 'departId',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        label: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    field: 'realname',
    label: '真实姓名',
    component: 'Input',
    required: true,
  },

  {
    field: 'mp',
    label: '联系电话',
    component: 'Input',
    required: true,
  },

  {
    field: 'sex',
    label: '性别',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];

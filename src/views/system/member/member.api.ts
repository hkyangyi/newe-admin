import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

export enum Api {
  GetDepartTree = '/api/admin/sys/deptgetlist',
  add = '/api/admin/sys/memberadd',
  edit = '/api/admin/sys/memberedit',
  del = '/api/admin/sys/memberdel',
  getlist = '/api/admin/sys/membergetlist',
}

/**
 * 获取部门树列表
 */
export const GetDepartTree = (params?) => defHttp.get({ url: Api.GetDepartTree, params });

/**
 * 获取列表
 */
export const GetList = (params?) => defHttp.get({ url: Api.getlist, params });

/**
 * 添加或编辑
 */
export const AddOrEdit = (params, isUpdate) => {
  if (isUpdate) {
    return defHttp.put({ url: Api.edit, params }, { BaseBack: true });
  } else {
    return defHttp.post({ url: Api.add, params }, { BaseBack: true });
  }
};

/**
 * 删除
 */
export const Del = (params, confirm = false) => {
  return new Promise((resolve, reject) => {
    const doDelete = () => {
      resolve(defHttp.delete({ url: Api.del, params }, { BaseBack: true }));
    };
    if (confirm) {
      createConfirm({
        title: '确定删除吗？',
        iconType: 'warning',
        onOk: () => doDelete(),
        onCancel: () => reject(),
      });
    } else {
      doDelete();
    }
  });
};

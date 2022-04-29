import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';

const { createConfirm } = useMessage();

export enum Api {
  getCurrentUserDeparts = '/sys/user/getCurrentUserDeparts',
  selectDepart = '/sys/selectDepart',
  add = '/api/admin/sys/deptadd',
  edit = '/api/admin/sys/deptedit',
  getlist = '/api/admin/sys/deptgetlist',
  del = '/api/admin/sys/deptdel',
  roleTreeList = '/api/admin/sys/megetlist',
  ruleget = '/api/admin/sys/deptgetrules',
  rulesave = '/api/admin/sys/deptrulessave',
}

/**
 * 获取部门树列表
 */
export const DepartTreeSync = (params?) => defHttp.get({ url: Api.getlist, params });

/**
 * 保存或者更新部门角色
 */
export const saveOrUpdateDepart = (params, isUpdate) => {
  if (isUpdate) {
    return defHttp.put({ url: Api.edit, params }, { BaseBack: true });
  } else {
    return defHttp.post({ url: Api.add, params }, { BaseBack: true });
  }
};

/**
 * 批量删除部门角色
 */
export const DelDepart = (params, confirm = false) => {
  return new Promise((resolve, reject) => {
    const doDelete = () => {
      resolve(defHttp.delete({ url: Api.del, params }, { joinParamsToUrl: true }));
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

/**
 * 获取权限树列表
 */
export const queryRoleTreeList = (params: object) =>
  defHttp.get({ url: Api.roleTreeList, params: params });

/**
 * 查询部门权限
 */
export const DepartGetRules = (params?) => defHttp.get({ url: Api.ruleget, params });
/**
 * 保存部门权限
 */
export const DepartSaveRules = (params) =>
  defHttp.post({ url: Api.rulesave, params }, { BaseBack: true });

import { defHttp } from '/@/utils/http/axios';
export const MenusAdd = (params: object) =>
  defHttp.post({ url: '/api/admin/sys/meadd', params: params }, { isTransformResponse: true });

export const MenusGetList = (params: object) =>
  defHttp.get({ url: '/api/admin/sys/megetlist', params: params });

export const MenusEdit = (params: object) =>
  defHttp.put({ url: '/api/admin/sys/meedit', params: params }, { isTransformResponse: true });
export const MenusDel = (params: object) =>
  defHttp.delete({ url: '/api/admin/sys/medel', params: params }, { isTransformResponse: true });

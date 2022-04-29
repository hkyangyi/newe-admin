import { defHttp } from '/@/utils/http/axios';
export const MenusAdd = (params: object) =>
  defHttp.post({ url: '/admin/sys/meadd', params: params }, { isTransformResponse: true });

export const MenusGetList = (params: object) =>
  defHttp.get({ url: '/admin/sys/megetlist', params: params });

export const MenusEdit = (params: object) =>
  defHttp.put({ url: '/admin/sys/meedit', params: params }, { isTransformResponse: true });
export const MenusDel = (params: object) =>
  defHttp.delete({ url: '/admin/sys/medel', params: params }, { isTransformResponse: true });
// export function MenusAdd(params) {
//   return defHttp.post({ url: '/admin/sys/meadd', params: params });
// }

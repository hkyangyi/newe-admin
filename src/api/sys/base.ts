import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  VerifySole = '/api/admin/verifysole',
}

/**
 * @description: 检测唯一
 */

export const VerifySole = (params) => {
  return defHttp.get<getMenuListResultModel>({ url: Api.VerifySole, params });
};

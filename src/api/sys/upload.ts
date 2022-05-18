import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}

export function UploadImgs(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: '/api/admin/upimages',
      onUploadProgress,
    },
    params,
  );
}

export function Upimages(file, callback: Function) {
  const params = new FormData();
  params.append('file', file.file);
  params.append('uuid', file.file.uid);
  params.append('domain', 'POST');
  params.append('filename', file.file.name);
  return defHttp.request({
    url: '/api/admin/upimages?uid=' + file.file.uid, //为了区别请求加上不同参数
    method: 'post',
    data: params,
    params: params,
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8',
    },
    onUploadProgress: function (progressEvent) {
      const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
      callback(complete);
    },
  });
}

export const GetImages = (params) => defHttp.get({ url: '/api/admin/imageslist', params });

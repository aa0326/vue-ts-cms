import ApiRequest from "@/network";
import { IDataType } from "../../types";
export function getPageListData(url: string, queryInfo: any) {
  return ApiRequest.post<IDataType>({
    url: url,
    data: queryInfo
  });
}

export function deletePageData(url: string) {
  return ApiRequest.delete<IDataType>({
    url: url
  });
}

export function createPageData(url: string, newData: any) {
  return ApiRequest.post<IDataType>({
    url: url,
    data: newData
  });
}

export function editPageData(url: string, editData: any) {
  return ApiRequest.patch<IDataType>({
    url: url,
    data: editData
  });
}

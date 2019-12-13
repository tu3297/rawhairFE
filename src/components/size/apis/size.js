import api from '../../../commom/AjaxUltil';

export function fetchListSizeApi(sizeData) {
  const getListSize = 'size/getAll';
  return api.get(getListSize, sizeData);
}
export function fetchaddSizeApi(sizeData){
  const addSize= 'size/addSize';
  return api.post(addSize,sizeData);
}
export function deleteSizeApi(sizeId){
  const deleteSize= 'size/deleteSize';
  return api.post(deleteSize,sizeId);
}
export function fetchGetListSizeOfProductType(productTypeId){
  const getSizeOfProductType = 'size/getSizeOfProductType';
  return api.get(getSizeOfProductType,productTypeId);
}
export function fetchGetListSizeOfClosureFrontal(productTypeId){
  const getSizeOfFrontalClosure = 'size/getSizeOfFrontalClosure';
  return api.get(getSizeOfFrontalClosure,productTypeId);
}
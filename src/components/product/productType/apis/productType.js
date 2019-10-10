import api from '../../../../commom/AjaxUltil';

export function fetchListProductTypeApi() {
  const getListProductType = 'prt/getAll';
  return api.get(
    getListProductType, 
    null, 
  );
}
export function fetchaddProductTypeApi(productTypeData){
  console.log('add prt');
  const addProductType = 'prt/addProductType';
  return api.post(addProductType,productTypeData);
}
export function deleteProductTypeApi(productTypeId){
  const deleteProductType = 'prt/deleteProductType';
  return api.post(deleteProductType,productTypeId);
}
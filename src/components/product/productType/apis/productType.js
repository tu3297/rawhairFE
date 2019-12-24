import api from '../../../../commom/AjaxUltil';

export function fetchListProductTypeApi() {
  const getListProductType = 'prt/getAll';
  return api.get(
    getListProductType, 
    null, 
  );
}
export function fetchaddProductTypeApi(productTypeData){
  const addProductType = 'prt/addProductType';
  return api.post(addProductType,productTypeData);
}
export function deleteProductTypeApi(productTypeId){
  const deleteProductType = 'prt/deleteProductType';
  return api.post(deleteProductType,productTypeId);
}
export function updateProductTypeColor(data){
  const updateProductTypeColor = 'prt/updateProductTypeColor';
  return api.post(updateProductTypeColor,data);
}
export function getAllProductTypeColorApi(){
  const getAllProductTypeColor = 'prt/getAllProductTypeColor';
  return api.get(getAllProductTypeColor,null);
}
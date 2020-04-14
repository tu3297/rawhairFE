import api from '../../../commom/AjaxUltil';
export function getDataApi(action) {
  const getData = 'product/getData';
  return api.get(
    getData, 
    null, 
  );
}
export function getProductApi(productData) {
  const getProduct = 'product/getProductById';
  return api.get(
    getProduct, 
    productData, 
  );
}
  export function saveProductApi(productData) {
  const saveProduct = 'product/saveProduct';
  return api.post(
    saveProduct, 
    productData, 
  );
  }
  export function getAllProductApi(productData) {
    const getAll = 'product/getAll';
    return api.get(
      getAll, 
      productData, 
    );
  }
  export function getAllProductInfoApi(productData) {
    const getInfoProduct = 'product/getInfoProduct';
    return api.get(
      getInfoProduct, 
      productData, 
    );
  }
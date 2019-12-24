import api from '../../../commom/AjaxUltil';
export function getNextIdApi(action) {
  const getNextId = 'product/getNextId';
  return api.get(
    getNextId, 
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